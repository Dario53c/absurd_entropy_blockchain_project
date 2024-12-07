// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract absurd_entropy{
    struct User {
        address walletAdress;
        string username;
        bool VIP;
    }

    mapping(address => User) public Customers;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
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

    function joinGame() external gameNotStarted onlyCustomer{
        player = msg.sender;
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
        if (playerScore > 21) endGame(); // bust
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
    function getScores() external view returns (uint8 player, uint8 house) {
        return (playerScore, houseScore);
    }
}