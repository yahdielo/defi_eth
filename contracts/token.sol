// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract POPOv2 is ERC20 {

    constructor(uint256 initialSupply) ERC20("POPOv2", "POPO") {
        _mint(msg.sender, initialSupply);
    }

}