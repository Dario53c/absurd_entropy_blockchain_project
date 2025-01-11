
        var userAddress;
        window.web3 = new Web3(window.ethereum);
        const address = "0x72e61FE1886b4F22dB1335B2f7072C04A4bB3AD0";
        const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"number","type":"uint8"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"BetPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint8","name":"card","type":"uint8"}],"name":"CardDealt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"}],"name":"GameEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Payout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"number","type":"uint8"},{"indexed":false,"internalType":"string","name":"color","type":"string"}],"name":"SpinResult","type":"event"},{"inputs":[],"name":"BLACKJACK_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COLOR_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"Customers","outputs":[{"internalType":"address","name":"walletAdress","type":"address"},{"internalType":"string","name":"username","type":"string"},{"internalType":"bool","name":"VIP","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adresa","type":"address"}],"name":"MakeVIP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"NUMBER_PAYOUT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"checkUserExist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"gameStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getHouseHand","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayerHand","outputs":[{"internalType":"uint8[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getScores","outputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"houseHand","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"houseScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isCustomer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joinGame","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"numberToColor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_number","type":"uint8"},{"internalType":"string","name":"_color","type":"string"}],"name":"placeBetAndSPinWheel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"placedBet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"player","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerHand","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playerScore","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"username","type":"string"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stand","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}];
        const contract = new web3.eth.Contract(abi, address);


        // Connect to Metamask
        $("#connectToMetamask").click(async function() {
            if (window.ethereum) {
                
                let addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
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
                $("#connectedAddress").html("<b>" + user.username + "</b>");
                const balance = await contract.methods.getBalance().call({ from: userAddress });
                console.log(balance);
                document.getElementById("user-balance").textContent = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;            }
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
                console.log(balance);
                document.getElementById("user-balance").textContent = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`; 
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
        async function playBlackjack() {
            const betAmount = document.getElementById("blackjack-bet").value;
            if (betAmount==""){
                    alert("Please enter a bet amount");
                    return;
            }
            await contract.methods.joinGame().send({from: userAddress});

            playerHand = await contract.methods.getPlayerHand().call();
            houseHand = await contract.methods.getHouseHand().call();

            // Format the hands into a readable string
            playerHandFormatted = playerHand.join(", ");
            houseHandFormatted = houseHand.join(", ");

            $("#playBlackjack").css('display','none');
            $("#blackjack-bet").css('display','none');
            $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>House Hand: " + houseHandFormatted);
            console.log(playerHandFormatted);
            console.log(houseHandFormatted);
            $("#hit").css('display','block');
            $("#stand").css('display','block');
            
        }

        $("#hit").click(async function() {
            await contract.methods.hit().send({from: userAddress});
            playerHand = await contract.methods.getPlayerHand().call({ from: userAddress });
            houseHand = await contract.methods.getHouseHand().call({ from: userAddress });
            playerHandFormatted = playerHand.join(", ");
            houseHandFormatted = houseHand.join(", ");
            $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>House Hand: " + houseHandFormatted);
        });

        $("#stand").click(async function() {
            await contract.methods.stand().send({from: userAddress});
            playerHand = await contract.methods.getPlayerHand().call({ from: userAddress });
            houseHand = await contract.methods.getHouseHand().call({ from: userAddress });
            playerHandFormatted = playerHand.join(", ");
            houseHandFormatted = houseHand.join(", ");
            $("#blackjack-result").html("Your Hand: " + playerHandFormatted + "<br>House Hand: " + houseHandFormatted);
        });
        

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
            await contract.methods.placeBetAndSPinWheel(number, color).call({from: userAddress});

            const balance = await contract.methods.getBalance().call({ from: userAddress });
            console.log(balance);
            document.getElementById("user-balance").textContent = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;

            if(await contract.methods.getRouletteWinner().call({ from: userAddress })){
                document.getElementById("roulette-result").textContent = "You won!";
            } else {
                document.getElementById("roulette-result").textContent = "You lost!";
            }
        }
        
