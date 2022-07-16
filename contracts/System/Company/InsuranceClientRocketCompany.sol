// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "./InsuranceRocketCompany.sol";

contract Client{
    address public owner;
    address public addressContract;
    address public addressPrincipalContract;
    InsuranceRocketCompany private IPrincipalContract;

    constructor(address _addr , address _addressContract ) {
        owner = _addr;
        addressContract = address(this);
        addressPrincipalContract= _addressContract;
        IPrincipalContract =InsuranceRocketCompany(payable(addressPrincipalContract));
    }

    //---------------------------------------Funciones contrato clientes---------------------------------------
    //Funcion para comprar tokens
    function buyTokens(uint16 _quantity) public payable {
        IPrincipalContract.buyTokens{value: msg.value}(_quantity, owner);
    }

    //Funcion para devolver ether cuando un Cliente se da de baja
    function balanceUser() public  view returns(uint){
        return  IPrincipalContract.balanceContractUser(addressContract);
    }

    //Funcion para ver servicios disponibles
    function listServices() public view returns(string[] memory){
        return IPrincipalContract.showActivedServices();
    }

    //Funcion ver detalles de un servicio
    function detailsService(string memory _name) public  view returns(string memory , uint16 , bool){
       return IPrincipalContract.showServiceDetails(_name);
    }

    //Funcion para cancelar mi contrato
    function cancelContract() public payable {
        IPrincipalContract.changeStatusContract(owner);
    }

    //Funcion usar un servicio
    function useService(string memory _nameService) public {
        IPrincipalContract.asignServiceClient(_nameService, owner);
    }

    //Funcion usar un servicio
    function useSpecialService(string memory _nameService) public {
        IPrincipalContract.asignSpecialServiceClient(_nameService, owner);
    }

    //Funcion para ver servicios especiales disponibles
    function listSpecialServices() public view returns(string[] memory){
        return IPrincipalContract.showActivedSpecialServices();
    }

    //Funcion ver detalles de un servicios especiales
    function detailsSpecialService(string memory _name) public  view returns(string memory , uint16 , bool, address){
       return IPrincipalContract.showSpecialServiceDetails(_name);
    }
}