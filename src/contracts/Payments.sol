// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/finance/PaymentSplitter.sol";

contract Payments is PaymentSplitter{

    constructor (address[] memory _payees, uint256[] memory _shares) PaymentSplitter(_payees,_shares)payable {}
}

/**
["0x0950f5F3eD03C0Bb4bc1159B517bEFD4f64441C3","0x35c074627e787c2f83A8B925AB29ff2805aBbf8D"]
*/

/**
[50,50]
*/
