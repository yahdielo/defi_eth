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
    event betWasMade(uint amount);
    event withdrawalAMde( address _to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    mapping(address => Player) public players;

    // @notice for testing the return will always be 0 for heads
    function roll() internal pure returns(uint){
        return 0;
    }

    // @notice this fall back function will map user deposited amount and assume is as a bet
    function recieve() external payable {
    
        require(msg.sender.value > 0);
        players[msg.sender].playerAddress = msg.sender;
        players[msg.sender].betAmount = msg.value;
        emit fundsDeposited(msg.sender,players[msg.sender].betAmount );
    }

    function withdraw() external payable {
        require(players[msg.sender].betAmount > 0);
        (bool, s) = msg.sender.call( value : players[msg.sender].betAmount)("");
        require(s);
        withdrawalAMde(msg.sender, players[msg.sender].betAmount);
    }

    function placeBet(uint _side) external payable {


        if (_side != 1 && _side != 0)
            revert choseAside();
        
        players[msg.sender].side = _side;
        emit betWasMade(side);
    }

    function myBet() public view returns(uint256){
        return players[msg.sender].betAmount;
    }
}