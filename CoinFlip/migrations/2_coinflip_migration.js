const Coinflip = artifacts.require("Coinflip");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Coinflip).then(function(instance){
    instance.fundContract({value: web3.utils.toWei("5","ether"), from: accounts[0]}).then(function(){
      console.log("The contract successfully funded");
    }).catch(function(err){
      console.log("error:" + err);
    });
  }) .catch(function(err){
    console.log("Failed to deploy " + err);
  });
};
