import "./Ownable.sol";
pragma solidity 0.5.12;


contract Coinflip is Ownable{

  uint public ContractBalance;

  event bet(address user, uint bet, bool);
  event funded(address owner, uint funding);


  modifier costs(uint cost){
      require(msg.value >= cost, "The minimum bet is 0.01 Ether");
      _;
  }

function flip() public payable costs(0.01 ether) returns(bool){
  require(address(this).balance >= msg.value, "The contract does not have enough funds");
  bool success;
  if(now % 2 == 0){
    ContractBalance += msg.value;
    success = false;
  }
  else if(now % 2 == 1){
    ContractBalance -= msg.value;
    msg.sender.transfer(msg.value * 2);
    success = true;
  }
  emit bet(msg.sender, msg.value, success);
  return success;
}

function fundContract() public payable onlyOwner returns(uint){
  require(msg.value != 0);
  emit funded(msg.sender, msg.value);
  return msg.value;
}

}
