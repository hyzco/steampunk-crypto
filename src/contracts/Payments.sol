// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Payments is PaymentSplitter{

    constructor (address[] memory _payees, uint256[] memory _shares) PaymentSplitter(_payees,_shares)payable {}
}

/**
["0x0950f5F3eD03C0Bb4bc1159B517bEFD4f64441C3","0xD3A68B6B2e184Ce1b325C9f811DbDCcF975eCab4"]
*/

/**
[50,50]
*/
