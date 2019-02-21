pragma solidity ^0.4.4

contract migrate{
    address public owner;
    uint publci last_completed_migration;

    modifier restricted(){
        if(msg.sender == owner) _;
    }

    function migrate(){
        owner = msg.sender;
    }
}
