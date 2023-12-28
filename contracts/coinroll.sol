// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract coinRoll {
    // @notice for the sides 0 means heads and 1 means tales

    address public owner;

    struct Player {
        address playerAddress;
        uint8  side;
        //bet amount is the amount of eth the player send
       uint256 betAmount;
    }

    error amountCantBeZero();
    error choseAside();

    event betWasMade(address sender, uint256 betAmount);
    event winnerPayOut(address reciever, uint256 payAmount);

    constructor() {
        owner = msg.sender;
    }

    mapping(address => Player) public players;

    // @notice for testing the return will always be 0 for heads
    function roll() internal pure returns(uint){
        return 0;
    }
    // @notice the bet amount has to be in ether
    function placeBet(uint256 _betAmount,uint8 _side) external payable {

        if (_betAmount < 0)
            revert amountCantBeZero();

        if (_side != 1 && _side != 0)
            revert choseAside();
        
         players[msg.sender].playerAddress = msg.sender;
        players[msg.sender].betAmount = _betAmount;
        players[msg.sender].side = _side;

        emit betWasMade(msg.sender, _betAmount);

        if (roll() == 0){
            (bool s,) = owner.call{ value: address(this).balance }("");
            require(s);
            emit winnerPayOut(owner, address(this).balance);
        }
    }

    function checkYourBet() public view returns(uint256){
        return players[msg.sender].betAmount;
    }
}