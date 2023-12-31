// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract coinRoll {
    // @notice for the sides 0 means heads and 1 means tales

    address public owner;

    struct Player {
        address playerAddress;
        uint  side;
        //bet amount is the amount of eth the player send
       uint256 betAmount;
    }

    error amountCantBeZero();
    error choseAside();

    event winnerPayOut(address reciever, uint256 payAmount);
    // this event will emit every time a deposit is made
    event fundsDeposited(address sender, uint256 amount);
    event side(uint amount);
    event withdrawalMade( address _to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    mapping(address => Player) public players;

    // @notice for testing the return will always be 0 for heads
    function roll() internal pure returns(uint) {
        return 0;
    }
    // @notice this fall back function will map user deposited amount and assume is as a bet
    function placeBet(uint _side) public {

        if (_side != 0 && _side != 1)
            revert choseAside();
        players[msg.sender].side = _side;

        emit side(_side);
    }

    receive() external payable {
    
        require(msg.value != 0);
        players[msg.sender].playerAddress = msg.sender;
        players[msg.sender].betAmount += msg.value;

        emit fundsDeposited(address(msg.sender), players[msg.sender].betAmount);
    }

    function withdrawal(uint256 _amount) external payable {
        require(players[msg.sender].betAmount >=  _amount);

        players[msg.sender].betAmount -=  _amount;
        (bool s,) = msg.sender.call{ value : _amount}("");

        require(s);

        emit withdrawalMade(msg.sender, _amount);

    }

    function myBet() public view returns(uint256 , uint){
        return (players[msg.sender].betAmount, players[msg.sender].side);
    }
}