const RocketCompany = artifacts.require("InsuranceRocketCompany");

contract('RocketCompany', (accounts) =>{

    let contract;

    before (async ()=>{
        contract = await RocketCompany.deployed();
    })

    describe('BalanceContractEthers', async () => {
        it ('checking balance contract', async ()=>{
            let totalSupply = await contract.balanceContractTokens({from:accounts[0]});
            expect(totalSupply.toNumber()).to.equal(10000);
        })
    })
})