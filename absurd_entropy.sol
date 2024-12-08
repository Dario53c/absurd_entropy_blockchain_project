// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract absurd_entropy{
    struct User {
        address walletAdress;
        string username;
        bool VIP;
    }

    uint256 public constant NUMBER_PAYOUT = 15; 
    uint256 public constant COLOR_PAYOUT = 2;
    uint256 public constant BLACKJACK_PAYOUT = 3; 


    mapping(address => User) public Customers;
    mapping(address => bool) public isCustomer;
    mapping(address => uint256) public placedBet;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyCustomer() {
        if(!isCustomer[msg.sender]){
        revert("Only a customer can call this function");}
        _;
    }

    mapping(uint8 => string) public numberToColor; //this is basiacly the roulette wheel
    constructor() {
        owner = msg.sender;

         // assigning colors to the roulette wheel here
        for (uint8 i = 1; i <= 36; i++) {
            if (
                i == 1 || i == 3 || i == 5 || i == 7 || i == 9 ||
                i == 12 || i == 14 || i == 16 || i == 18 || i == 19 ||
                i == 21 || i == 23 || i == 25 || i == 27 || i == 30 ||
                i == 32 || i == 34 || i == 36
            ) {
                numberToColor[i] = "red";
            } else {
                numberToColor[i] = "black";
            }
        }
        numberToColor[0] = "green";
    
    }

    function registerUser(string memory username) public {
        Customers[msg.sender] = User(msg.sender, username, false);
        isCustomer[msg.sender] = true;
    }

    function MakeVIP(address adresa) public onlyOwner{
        Customers[adresa].VIP = true;
    } 


    //blackjack logic----------------------------------------------------------------------

    uint8[] public playerHand;
    uint8[] public houseHand;
    uint8 public playerScore;
    uint8 public houseScore;
    bool public gameStarted = false;
    address public player;
    uint8[] private deck;
    uint256 private deckIndex;

    event CardDealt(address indexed recipient, uint8 card);
    event GameEnded(address indexed winner);
    
    modifier gameIsStarted() {
        require(gameStarted, "The game has not started yet");
        _;
    }

    modifier gameNotStarted() {
        require(!gameStarted, "The game is already started");
        _;
    }

    function joinGame() external gameNotStarted onlyCustomer payable{
        if(address(this).balance <= msg.value * 15){
                revert("Contract does not have enough funds to pay out");
            }
        player = msg.sender;
        placedBet[msg.sender] = msg.value;
        startGame();
    }

     // initialize deck and clear variables
    function initializeDeck() internal {
        delete deck;
        delete playerHand;
        delete houseHand;
        playerScore = 0;
        houseScore = 0;
        deckIndex = 0;

        for (uint8 i = 1; i <= 52; i++) {
            deck.push(i);
        }

        for (uint256 i = 0; i < deck.length; i++) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, i))) % deck.length;
            (deck[i], deck[randomIndex]) = (deck[randomIndex], deck[i]);
        }
    }

    // convert value of card, and also make sure the pictures are worth 10
    function cardValue(uint8 _card) internal pure returns (uint8) {
        uint8 value = _card % 13 + 1;
        if (value > 10) return 10;
        return value;
    }


    function startGame() internal{

        initializeDeck();

        dealCard(playerHand, true);
        dealCard(playerHand, true);
        dealCard(houseHand, false);
        dealCard(houseHand, false); 

        gameStarted = true;
    }


    function dealCard(uint8[] storage _hand, bool isPlayer) internal {
        require(deckIndex < deck.length, "No more cards in the deck");

        uint8 card = deck[deckIndex];
        _hand.push(card);
        deckIndex++;

        if (isPlayer) {
            playerScore += cardValue(card);
        } else {
            houseScore += cardValue(card);
            if (_hand.length == 1) emit CardDealt(address(this), card); // onlz the first card should be visible
        }
    }

    // hit
    function hit() external onlyCustomer gameIsStarted {
        require(playerScore < 21, "Cannot hit, your score is 21 or above");
        dealCard(playerHand, true);
        if (playerScore >= 21) endGame(); // bust or perfect blackjack
    }

    // stand
    function stand() external onlyCustomer gameIsStarted {
        houseTurn();
        endGame();
    }

    // house logic (simple i know)
    function houseTurn() internal {
        while (houseScore < 17) {
            dealCard(houseHand, false);
        }
    }

    function endGame() internal {
        gameStarted = false;
        uint256 payout = 0;

        address winner;
        if (playerScore > 21) {
            winner = address(this); // if player busts, house wins
        } else if (houseScore > 21 || playerScore > houseScore) {
            winner = player;
            if(Customers[msg.sender].VIP){
                payout = placedBet[msg.sender] * BLACKJACK_PAYOUT * 2;
            }else{
            payout = placedBet[msg.sender] * BLACKJACK_PAYOUT;} // player wins
        }else if(playerScore == houseScore){
            winner = address(0x00); //draw
            payout = placedBet[msg.sender];
        }else if (houseScore > playerScore) {
            winner = address(this); // house wins
        }

        
        if (payout > 0) {
            
            payable(msg.sender).transfer(payout);
            emit Payout(msg.sender, payout);
        }
        placedBet[msg.sender] = 0x00;
        emit GameEnded(winner);
    }



    //testing functions
    // get plazer hand
    function getPlayerHand() external view returns (uint8[] memory) {
        return playerHand;
    }

    // get house hand
    function getHouseHand() external view returns (uint8[] memory) {
        return houseHand;
    }

    // get scores
    function getScores() external view returns (uint8, uint8) {
        return (playerScore, houseScore);
    }

    //roulette part ------------------------------------------------------------------------------

    event BetPlaced(address indexed player, uint256 amount, uint8 number, string color);
    event SpinResult(uint8 number, string color);
    event Payout(address indexed player, uint256 amount);

    
    function placeBetAndSPinWheel(uint8 _number, string memory _color) external payable onlyCustomer{
        require(msg.value > 0, "Bet amount must be greater than 0");
        if(address(this).balance <= msg.value * 15){
                revert("Contract does not have enough funds to pay out");
            }
        require(_number <= 36, "Invalid number, must be between 0 and 36");
        require(
            keccak256(abi.encodePacked(_color)) == keccak256(abi.encodePacked("red")) ||
            keccak256(abi.encodePacked(_color)) == keccak256(abi.encodePacked("black")) ||
            keccak256(abi.encodePacked(_color)) == keccak256(abi.encodePacked("")),
            "Invalid color, must be 'red', 'black', or empty"
        );//iz nekog razloga stringovi se jedino ovako mogu compareat

        emit BetPlaced(msg.sender, msg.value, _number, _color);

        uint256 playerBet = msg.value;
        uint256 payout = 0;

        // simulate spin
        uint8 winningNumber = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 37);
        string memory winningColor = numberToColor[winningNumber];

        emit SpinResult(winningNumber, winningColor);

        if (_number == winningNumber) {
            if(Customers[msg.sender].VIP){
                payout = playerBet * NUMBER_PAYOUT * 2;
            }else{
            payout = playerBet * NUMBER_PAYOUT;}
        } else if (keccak256(abi.encodePacked(_color)) == keccak256(abi.encodePacked(winningColor))) {
            if(Customers[msg.sender].VIP){
                payout = playerBet * COLOR_PAYOUT * 2;
            }else{
            payout = playerBet * COLOR_PAYOUT;}
        }

        if (payout > 0) {
            require(address(this).balance >= payout, "Contract does not have enough funds to pay out");
            payable(msg.sender).transfer(payout);
            emit Payout(msg.sender, payout);
        }
    }

    //these are mainly testing functions--------------------------------------------------------------
    
    function depositFunds() external payable onlyOwner{}

    // withdraw some money for myself
    function withdrawFunds(uint256 _amount) external onlyOwner{
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(owner).transfer(_amount);
    }

    function getBalance() external view  onlyOwner returns (uint256){
        return address(this).balance;
    }
}
   