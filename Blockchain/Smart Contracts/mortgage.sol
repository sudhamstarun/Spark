pragma solidity ^0.5.1;

contract mortgage{
    /* constructor will be used to deploy the smart contract on blockchain.
    Setting initial account balance to 1000000 and loan status to 'Initiated'.
    Also, at the moment the support for doubles and floats in Solidity is rather weak so might
    have to stick with float.
    */

    function Mortgage() public{
        loanApplicant = msg.sender;
    }

    // address of the loanApplicant

    address loanApplicant;

}
