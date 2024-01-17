// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity^0.8.17;

contract tokenTransfer {


    IERC20 public token;
    address public owner;

    event tokenWasTransfer(uint256 amount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);

    }


    function transferPOPO(address _from, address _to, uint256 _amount) public  returns (uint256) {
        
        
        //make sure we get the approval to before sending tokens
        require(token.approve(address(msg.sender), _amount), 'not able to approve');

        require(token.transferFrom(_from, _to, _amount), "transfer failed");
        return _amount;
    }

    function ContractBalance() external view returns(uint256) {
        return address(this).balance;
    }

}