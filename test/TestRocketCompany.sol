// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/System/Company/InsuranceRocketCompany.sol";

contract TestRocketCompany {
    
    InsuranceRocketCompany contractInstance= InsuranceRocketCompany(DeployedAddresses.InsuranceRocketCompany());

    address addressContract = address(this);

    function testBalanceContract () public {
        uint balance = contractInstance.balanceContractTokens();

        Assert.equal(balance, 10000 , 'probando');
    }
}