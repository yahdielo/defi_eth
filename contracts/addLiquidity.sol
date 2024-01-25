// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.17;

// to add liquidity i need the router interface

interface IUniswapV2Router 
{
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH, uint liquidity);
  
}

contract LProvider {

    address public owner;
    address public Router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    mapping(address => uint256) public Balance;

    event depositMade(address sender, uint256 amount);
    event Withdrawal(address caller, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        Balance[msg.sender] += msg.value;
        emit depositMade(msg.sender,  msg.value);
    }
    function withdrawal(uint256 _amount) external returns(bool) {
        require(msg.sender == owner , 'not the owner');
        Balance[msg.sender] -= _amount;
        (bool s,) = owner.call{ value: address(this).balance }("");
        require(s);
        emit Withdrawal(msg.sender , _amount);
        return s;
    }
    function addLiquidityETH( 
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline) external {
        
        //approve this contract to send token.
        IERC20(token).approve(address(this), amountTokenDesired);
        //send tokens to router
        IERC20(token).transferFrom(owner, address(Router), amountTokenDesired);
        //transfer eth from this contrat to the router
        (bool s,) = address(this).call{ value : address(this).balance }("");
        require(s);

        //approve router to spend tokens
        IERC20(token).approve(Router, amountTokenDesired);

        IUniswapV2Router(Router).addLiquidityETH(
            token,
            amountTokenDesired,
            amountTokenMin, 
            amountETHMin, 
            owner, 
            block.timestamp);
    }
}