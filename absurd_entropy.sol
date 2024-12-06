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
}