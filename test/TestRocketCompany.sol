const RocketCompany = artifacts.require("InsuranceRocketCompany");
const Client = artifacts.require("Client");

contract("RocketCompany", (accounts) => {
  let contract;
  let clientRequest;

  before(async () => {
    contract = await RocketCompany.deployed();
    clientRequest = await contract.requestSubscriptionClient({
      from: accounts[1],
    });
  });

  describe("Clients", () => {
    describe("requestSubscriptionClient", () => {
      it("return emit success", async () => {
        let verifyRequest = await contract.showPendingRequest("Client");

        expect(verifyRequest.length).to.equal(1);
        expect(verifyRequest[0]).to.equal(accounts[1]);
      });
    });

    describe("BalanceContractEthers", () => {
      it("checking balance contract", async () => {
        let totalSupply = await contract.balanceContractTokens({
          from: accounts[0],
        });
        expect(totalSupply.toNumber()).to.equal(10000);
      });
    });

    /* describe.only("cancelContractClient", async () => {
      it("checking balance contract", async () => {
        
        await contract.enableSubscription(accounts[1], { from: accounts[0] });
        await contract.createClientFactory({ from: accounts[1] });
        
        
        let adressContract = await contract.checkNumberContract({from: accounts[1]})
        let clientContract = await Client.new(accounts[1], adressContract);
        // console.log(clientContract.contract.methods.IPrincipalContract);
        // console.log(await clientContract.contract.methods.cancelContract().call({from: adressContract}));
        
        // await clientContract.methods['cancelContract()'].sendTransaction({from: adressContract});
        // console.log("aaaaaaaaaaaaaaaaaaaaa", await contract.showStatusAndRole.call({from: accounts[1]}));

        // clientContract.methods['cancelContract()'].call({from: accounts[1]});
        // console.log(contract.RequestStatus);
        // console.log(await clientContract.methods["cancelContract()"].call());
        // console.log("vbbbbbbbbbbbbb", await contract.showStatusAndRole.call(accounts[1]));
        // console.log(contract.RequestStatus.call(accounts[1]));

        // let cancelledContract = await clientContract.cancelContractClient(
        //   accounts[1],
        //   { from: accounts[1] }
        // );

        // console.log(cancelledContract);
      });
    }); */
  });

  describe("Admin", async () => {
    describe("showPendingRequest", () => {
      it("return pending requests", async () => {
        await contract.requestSubscriptionClient({
          from: accounts[2],
        });

        let verifyRequest = await contract.showPendingRequest("Client");
        expect(verifyRequest.length).to.equal(2);
      });
    });

    describe("enableSubscription", () => {
      it("enable contract", async () => {
        await contract.enableSubscription(accounts[1]);
        let showDetail = await contract.showDetailsUser(accounts[1]);

        expect(showDetail["1"]).to.equal(true);
        expect(showDetail["3"]).to.equal("acepted");
      });
    });

    describe("createService", () => {
      it("create a service", async () => {
        await contract.createService("radio", 1000);
        await contract.createService("medicine", 2000);

        let services = await contract.showListServices();

        expect(services.length).to.equal(2);
      });
    });

    describe("changeStatusService", () => {
      it("change status of service", async () => {
        await contract.createService("rx", 1000);
        await contract.createService("med", 2000);
        await contract.changeStatusService("rx");

        let serviceRadio = await contract.showServiceDetails("rx");
        let serviceMedicine = await contract.showServiceDetails("med");
        let activedServices = await contract.showActivedServices();

        expect(serviceRadio["0"]).to.equal("rx");
        expect(serviceRadio["2"]).to.equal(false);
        expect(serviceMedicine["0"]).to.equal("med");
        expect(serviceMedicine["2"]).to.equal(true);
        expect(activedServices[2]).to.equal("med");
        expect(activedServices[3]).to.equal("");
      });
    });

    describe("showListServices", () => {
      it("show list all services", async () => {
        await contract.createService("rx1", 1000);

        let services = await contract.showListServices();
        expect(services.length).to.equal(5);
      });
    });

    describe("showListUsers", () => {
      it("show list all users", async () => {
        await contract.requestSubscriptionClient({
          from: accounts[3],
        });

        let users = await contract.showListUsers();

        expect(users.length).to.equal(3)
      });
    });

    describe("bannedUser", () => {
      it("banned an user", async () => {
        await contract.requestSubscriptionClient({
          from: accounts[4],
        });
        await contract.bannedUser(accounts[4]);

        let userDetails = await contract.showDetailsUser(accounts[4]);

        expect(userDetails["3"]).to.equal("banned")
      });
    });

    describe("unBannedUser", () => {
      it("unBanned an user", async () => {
        await contract.requestSubscriptionClient({
          from: accounts[5],
        });
        await contract.bannedUser(accounts[5]);
        await contract.unBannedUser(accounts[5]);

        let userDetails = await contract.showDetailsUser(accounts[5]);

        expect(userDetails["3"]).to.equal("active");
      });
    });
  });
});