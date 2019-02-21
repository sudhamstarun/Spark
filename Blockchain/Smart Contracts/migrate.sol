pragma solidity ^0.5.1;

contract migrate{
    address public owner;
    uint public last_completed_migration;

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
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
