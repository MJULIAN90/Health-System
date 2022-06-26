import getWeb3 from "./getWeb3";
import SimpleStorageContract from "../contracts/InsuranceRocketCompany.json";

const initWeb3 = async ()=>{

  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    // Get the contract instance.

    // if we want automatic get id
    //const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorageContract.networks['1337'];
    const instance = await new web3.eth.Contract(
      SimpleStorageContract.abi,
      deployedNetwork.address,
    );

    return { 
      instance,
      accounts,
      web3
    } 

  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
}

export default initWeb3;