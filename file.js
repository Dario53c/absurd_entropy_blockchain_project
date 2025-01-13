
var userAddress;
window.web3 = new Web3(window.ethereum);
const address = "0xa0911169a3d6e24886d80209c54418ca3488f144";
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"number","type":"uint8"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"BetPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint8","name":"card","type":"uint8"}],"name":"CardDealt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Payout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"number","type":"uint8"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"SpinResult","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"BLACKJACK_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COLOR_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"Customers","outputs":[{"internalType":"address","name":"walletAdress","type":"address"},{"internalType":"string","name":"username","type":"string"},{"internalType":"bool","name":"VIP","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adresa","type":"address"}],"name":"MakeVIP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"NUMBER_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"checkUserExist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlackJackWinner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getHouseHand","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getHouseScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPayout","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayerHand","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayerScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRouletteWinner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getScores","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"houseHand","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"houseScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isCustomer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinGame","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"numberToColor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_number","type":"uint8"},{"internalType":"string","name":"_color","type":"string"}],"name":"placeBetAndSPinWheel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"placedBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"player","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerHand","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playerScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"username","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stand","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const contract = new web3.eth.Contract(abi, address);

let addresses
// Connect to Metamask
$("#connectToMetamask").click(async function() {
    if (window.ethereum) {
        
        addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3( window.ethereum );
        console.log(addresses);

        $("#connectToMetamask").hide();
        console.log(await contract.methods.isCustomer(addresses[0]).call());
        if(!await contract.methods.isCustomer(addresses[0]).call()){
            $("#username").addClass('fade-in');
            
        } else {        
            $("#address").addClass('fade-in');
            $("#games").addClass('fade-in');
            $("#userName").css('display', 'none');
            $("#setUsername").css('display', 'none');
            $("#loginParagraph").css('display', 'none');
        userAddress = addresses[0];

        const user = await contract.methods.Customers(addresses[0]).call();
        console.log(user.username);
        
        if (user.VIP) {
            $("#connectedAddress").html("<b>" + user.username + " VIP</b>");
        } else {
            $("#connectedAddress").html("<b>" + user.username + "</b>");
        }
        const balance = await contract.methods.getBalance().call({ from: userAddress });
        const formattedBalance = Web3.utils.fromWei(balance, 'ether');
        console.log(balance);
        document.getElementById("user-balance").textContent = 'Balance: ' + formattedBalance + 'ETH';
                }
}
});


// Setting the username
$("#setUsername").click(async function() {

    const username = document.getElementById("userName").value;
    if (username==""){
            alert("Please enter a username");
            return;
    }
    userAddress = addresses[0];
    await contract.methods.registerUser(username).send({from: userAddress});
    $("#address").addClass('fade-in');
    $("#games").addClass('fade-in');
    $("#userName").css('display', 'none');
    $("#setUsername").css('display', 'none');
    $("#loginParagraph").css('display', 'none');
    
    $("#connectedAddress").html("<b>" + username + "</b>");

    const balance = await contract.methods.getBalance().call({ from: userAddress });
    const formattedBalance = Web3.utils.fromWei(balance, 'ether');
    console.log(balance);
    document.getElementById("user-balance").textContent = 'Balance: ' + formattedBalance + 'ETH';
});


// Become VIP
$("#becomeVIP").click(async function() {
    await contract.methods.MakeVIP(userAddress).send({from: userAddress});
});

// Blackjack logic ---------------------------------------------------------------------------------------------------------------------

let playerHand;
let houseHand;

let playerHandFormatted;
let houseHandFormatted;

let playerScore;
let houseScore;

async function playBlackjack() {
    document.getElementById("blackjack-result").textContent = "";
    document.getElementById("blackjack-final").textContent = "";
    const betAmount = document.getElementById("blackjack-bet").value;
    if (betAmount==""){
            alert("Please enter a bet amount");
            return;
    }
    await contract.methods.joinGame().send({from: userAddress,
        value: betAmount});

    playerHand = await contract.methods.getPlayerHand().call();
    houseHand = await contract.methods.getHouseHand().call();
    playerHandFormatted = playerHand.join(", ")
    playerHandFormatted = playerHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

houseHandFormatted = houseHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

    if(houseHandFormatted[houseHandFormatted.length-2]=="1" && houseHandFormatted[houseHandFormatted.length-1]=="0"){
        houseHandFormatted = houseHandFormatted.slice(0, -2) + "x"; // Remove "10" and replace with "x"
    } else{
        houseHandFormatted = houseHandFormatted.slice(0, -1) + "x";
    }
    $("#playBlackjack").css('display','none');
    $("#blackjack-bet").css('display','none');
    playerScore = await contract.methods.getPlayerScore().call({from: userAddress});
    $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>playerScore: " + playerScore + "<br><br>House Hand: " + houseHandFormatted + "<br>houseScore: x");
    console.log(playerHandFormatted);
    console.log(houseHandFormatted);
    $("#hit").css('display','inline-block');
    $("#stand").css('display','inline-block');
    
}

$("#hit").click(async function() {
    await contract.methods.hit().send({from: userAddress});
    playerHand = await contract.methods.getPlayerHand().call();
    houseHand = await contract.methods.getHouseHand().call();
    playerHandFormatted = playerHand.join(", ")
    playerHandFormatted = playerHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

houseHandFormatted = houseHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

    if(houseHandFormatted[houseHandFormatted.length-2]=="1" && houseHandFormatted[houseHandFormatted.length-1]=="0"){
        houseHandFormatted = houseHandFormatted.slice(0, -2) + "x"; // Remove "10" and replace with "x"
    } else{
        houseHandFormatted = houseHandFormatted.slice(0, -1) + "x";
    }
    let playerScore = await contract.methods.getPlayerScore().call({from: userAddress});
    if(playerScore>21){
        automaticLoss();
    } else{
        $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>playerScore: " + playerScore + "<br><br>House Hand: " + houseHandFormatted + "<br>houseScore: x");}
});

$("#stand").click(async function() {
    await contract.methods.stand().send({from: userAddress});
    playerHand = await contract.methods.getPlayerHand().call();
    houseHand = await contract.methods.getHouseHand().call();
    playerHandFormatted = playerHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

houseHandFormatted = houseHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

    playerScore = await contract.methods.getPlayerScore().call({from: userAddress});
    houseScore = await contract.methods.getHouseScore().call({from: userAddress});
    $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>playerScore: " + playerScore + "<br><br>House Hand: " + houseHandFormatted + "<br>houseScore: " + houseScore);
    let result = await contract.methods.getBlackJackWinner().call({from: userAddress});
    if(result==1){
        $("#blackjack-final").html("You won!");
    }
    if(result==2){
        $("#blackjack-final").html("You lost!");
    }
    if(result==3){
        $("#blackjack-final").html("Its a draw ._.");
    }

    $("#hit").css('display','none');
    $("#stand").css('display','none');
    $("#playBlackjack").css('display','inline-block');
    $("#blackjack-bet").css('display','inline-block');
});

async function automaticLoss() {
    playerHand = await contract.methods.getPlayerHand().call();
    houseHand = await contract.methods.getHouseHand().call();
    playerHandFormatted = playerHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

houseHandFormatted = houseHand.join(", ")
    .replace(/\b11\b/g, "10")  // Replace 11 with 10
    .replace(/\b12\b/g, "J")   // Replace 12 with J
    .replace(/\b13\b/g, "Q")   // Replace 13 with Q
    .replace(/\b14\b/g, "K");  // Replace 14 with K

    playerScore = await contract.methods.getPlayerScore().call({from: userAddress});
    houseScore = await contract.methods.getHouseScore().call({from: userAddress});
    $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>playerScore: " + playerScore + "<br><br>House Hand: " + houseHandFormatted + "<br>houseScore: " + houseScore);

    let result = await contract.methods.getBlackJackWinner().call({from: userAddress});
    if(result==1){
        $("#blackjack-final").html("You won!");
    }
    if(result==2){
        $("#blackjack-final").html("You lost!");
    }
    if(result==3){
        $("#blackjack-final").html("Its a draw ._.");
    }

    $("#hit").css('display','none');
    $("#stand").css('display','none');
    $("#playBlackjack").css('display','inline-block');
    $("#blackjack-bet").css('display','inline-block');
}


// Roulette logic ---------------------------------------------------------------------------------------------------------------------

async function spinRoulette() {
    const betAmount = document.getElementById("roulette-bet").value;
    if (betAmount==""){
            alert("Please enter a bet amount");
            return;
    }
    document.getElementById("roulette-result").textContent = "Spinning...";
    const color = document.getElementById("roulette-color").value;
    if(color=="green"){
        color="";
    }
    const number = document.getElementById("roulette-number").value;
    await contract.methods.placeBetAndSPinWheel(number, color).call({from: userAddress,
        value: betAmount});

    const balance = await contract.methods.getBalance().call({ from: userAddress });
    console.log(balance);
    document.getElementById("user-balance").textContent = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;

    if(await contract.methods.getRouletteWinner().call({ from: userAddress })){
        document.getElementById("roulette-result").textContent = "You won!";
    } else {
        document.getElementById("roulette-result").textContent = "You lost!";
    }
}

