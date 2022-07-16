// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "./InsuranceRocketCompany.sol";

contract Laboratory{
    address public owner;
    address private addressContract;
    InsuranceRocketCompany private IPrincipalContract;

    constructor(address _addr, address _addressContract) {
        owner = _addr;
        addressContract = address(this);
        IPrincipalContract =InsuranceRocketCompany(payable(_addressContract));
    }

    //Funcion para crear los servicios ofrecidos
    function createSpecialService(string memory _name, uint16 _price) public {
        IPrincipalContract.createSpecialService(_name, _price, owner);
    }

    //Funcion para cambiar el estado de los servicios especiales
    function changeStatusServiceLaboratory(string memory _name) public {
        IPrincipalContract.changeStatusServiceLaboratory(_name, owner);
    }

    //Funcion cancelar contrato de laborario
    function cancelContractLaboratory() public{
        IPrincipalContract.changeStatusContract(owner);
    }

    //Funcion para canjear sus tokens por dinero
    function withdrawBalanceLaboratory(uint16 _quantityTokens) public payable {
         IPrincipalContract.withdrawBalanceLaboratory(owner, _quantityTokens);
    }
    
    //Funcion para ver el balance del laboratorio
    function balanceLaboratory() public  view returns(uint){
        return  IPrincipalContract.balanceContractUser(addressContract);
    }

    //Funcion para ver servicios especiales disponibles
    function listSpecialServices() public view returns(string[] memory){
        return IPrincipalContract.showSpecialServicesByLaboratory();
    }

    function detailsSpecialService(string memory _name) public  view returns(string memory , uint16 , bool, address){
       return IPrincipalContract.showSpecialServiceDetails(_name);
    }
}