pragma solidity ^0.4.17;

contract migrate{
    address public owner;
    uint public last_completed_migration;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setCompleted (uint completed) public onlyOwner{
        last_completed_migration = completed;
    }

    function upgrade (address new_address) public onlyOwner{
        migrate upgraded = migrate(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
