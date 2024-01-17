// SPDX-License-Identifier: MIT

pragma solidity^0.8.17;

interface ICALLER {
    //the contract fucntion i want to call
    function transferPOPO(address _from, address _to, uint256 _amount) external returns(uint256);
}

contract caller {

   address public callerAddress;
   ICALLER public callerC;

    address public owner;

    constructor(address _callerAddress) {
        callerC = ICALLER(_callerAddress);
        owner = msg.sender;

    }

    function callTransfer(address _to, uint256 _amount) public returns(bool){

        callerC.transferPOPO(owner, _to, _amount);
        return true;
    }

}