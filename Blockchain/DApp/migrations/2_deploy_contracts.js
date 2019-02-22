var Mortgage = artifacts.require("./mortgage.sol");

module.exports = function(deployer) {
  deployer.deploy(Mortgage);
};
