const Migrations = artifacts.require("InsuranceRocketCompany");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
