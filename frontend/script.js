document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        let contractAddress = "0x01AEd446f1B9C0929735aA9b6541817346a7b8f8";
        let contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_conversionRate",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                    }
                ],
                "name": "PointsRedeemed",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "recycle",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "pointsEarned",
                        "type": "uint256"
                    }
                ],
                "name": "Recycled",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                    }
                ],
                "name": "redeemPoints",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "registerRecycler",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "newRate",
                        "type": "uint256"
                    }
                ],
                "name": "updateConversionRate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "conversionRate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "recyclers",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "points",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        document.getElementById("connectWallet").addEventListener("click", async () => {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0];
                document.getElementById("accountAddress").textContent = account;
                document.getElementById("accountInfo").classList.remove("hidden");

                const balance = await contract.methods.balanceOf(account).call();
                document.getElementById("accountBalance").textContent = web3.utils.fromWei(balance, "ether");
            } catch (error) {
                console.error(error);
            }
        });

        document.getElementById("transferBtn").addEventListener("click", async () => {
            const recipient = document.getElementById("recipient").value;
            const amount = document.getElementById("amount").value;
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            if (!recipient || !amount) {
                alert("Please enter recipient and amount");
                return;
            }

            try {
                await contract.methods.transfer(recipient, web3.utils.toWei(amount, "ether")).send({ from: accounts[0] });
                document.getElementById("statusMessage").textContent = "Transfer successful!";
            } catch (error) {
                document.getElementById("statusMessage").textContent = "Transfer failed!";
                console.error(error);
            }
        });
    } else {
        alert("Please install MetaMask!");
    }
});
