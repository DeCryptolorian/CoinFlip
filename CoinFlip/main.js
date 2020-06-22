
var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x4ff5949B1645f966ED7229a29B7E33D9cC6440f0", {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#send_flip").click(flip);
    $("#fund_contract").click(fundContract);
});

  function flip(){
    var bet = $("#bet_input").val();
    var config = {value: web3.utils.toWei(bet, "ether")}
      console.log(bet);

contractInstance.methods.flip().send(config)
    .on("transactionHash", function(hash){
      console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log(confirmationNr);
    })
    .on("receipt", function(receipt){
      console.log(receipt);
      if(receipt.events.bet.returnValues[2] == false){
        alert("Your crops failed.");
      }
      else if(receipt.events.bet.returnValues[2] == true){
        alert("Your harvest has reaped some rewards!" + bet + "Ether");
      }
    })
  }

  function fundContract(){
    var fund = $("#fund_input").val();
    var config = {
      value: web3.utils.toWei(fund, "ether")
    }
    contractInstance.methods.fundContract().send(config)
    .on("transactionHash", function(hash){
      console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log(confirmationNr);
    })
    .on("receipt", function(receipt){
      console.log(receipt);
    })
  }
