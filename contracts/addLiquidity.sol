// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.17;

// to add liquidity i need the router interface

interface IUniswapV2Router 
{
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
  
}

contract liquidityProvider {

    event Log(string msg, uint256 val);
    address public Router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountA,
        uint amountB,
        address to,
        uint deadline) external {
        
        //approve this contract to call tranfer from
        IERC20(tokenA).approve(address(this), amountA);
        IERC20(tokenB).approve(address(this), amountB);

        //send tokens to router
        IERC20(tokenA).transferFrom(owner, Router, amountA);
        IERC20(tokenB).transferFrom(owner, Router, amountB);

        //approve router to spend tokens
        IERC20(tokenA).approve(Router, amountA);
        IERC20(tokenB).approve(Router, amountB);

        IUniswapV2Router(Router).addLiquidity(
            tokenA,
            tokenB,amountA, 
            amountB, 
            1, 
            1, 
            address(this), block.timestamp);
        
        emit Log('amountA', amountA);
        emit Log('amountB', amountB);
    }
}