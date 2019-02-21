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

    function setCompleted(uint completed) restricred {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) restricred{
        migrate upgraded = migrate(new_address);
        upgraded.setCompleted(last_completed_migration)
    }
}
