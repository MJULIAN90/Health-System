// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "./InsuranceRocketCompany.sol";

contract Client{
    address public owner;
    address public addressContract;
    address public addressPrincipalContract;
    bool public statusContract;
    InsuranceRocketCompany private IPrincipalContract;

    constructor(address _addr , address _addressContract ) {
        owner = _addr;
        addressContract = address(this);
        addressPrincipalContract= _addressContract;
        IPrincipalContract =InsuranceRocketCompany(payable(addressPrincipalContract));
        statusContract = true;
    }

    //-----------------------------------------events--------------------------------------------------
    //Evento para cancelar un contrato
    event cancelContractEvent(string);

    //Evento para cuando se utiliza un servicio
    event useServiceEvent(string);

    //Evento para cuando se compran tokens
    event buyTokensEvent(string);

    //Funcion cancelar contrato
    function changeStatus() private {
        statusContract = !statusContract;
    }

    //---------------------------------------Funciones contrato clientes---------------------------------------
    //Funcion para comprar tokens
    function buyTokens(uint16 _quantity) public payable {
        require(statusContract , "No active contract");
        IPrincipalContract.buyTokens{value: msg.value}(_quantity, owner);
        // emit buyTokensEvent("purchased tokens");   
    }

    //Funcion para devolver ether cuando un Cliente se da de baja
    function balanceUser() public  view returns(uint){
        require(statusContract , "No active contract");
        return  IPrincipalContract.balanceContractUser(addressContract);
    }

    //Funcion para ver servicios disponibles
    function listServices() public view returns(string[] memory){
        require(statusContract , "No active contract");
        return IPrincipalContract.showActivedServices();
    }

    //Funcion ver detalles de un servicio
    function detailsService(string memory _name) public  view returns(string memory , uint16 , bool){
       require(statusContract , "No active contract");
       return IPrincipalContract.showServiceDetails(_name);
    }

    //Funcion para cancelar mi contrato
    function cancelContract() public payable {
       require(statusContract , "No active contract a cancelar");
    //    IPrincipalContract.cancelContractClient(owner);
        IPrincipalContract.changeStatusContract(owner);
        // changeStatus();
    //    emit cancelContractEvent("contract cancelled");
    }

    //Funcion usar un servicio
    function useService(string memory _nameService) public {
        IPrincipalContract.asignServiceClient(_nameService, owner);
        // emit useServiceEvent("assigned service");
    }

    //Funcion usar un servicio
    function useSpecialService(string memory _nameService) public {
        IPrincipalContract.asignSpecialServiceClient(_nameService, owner);
    }

    //Funcion para ver mi historial de servicios
    function historyServices()public view returns(string [] memory) {
        return IPrincipalContract.showServicesClient(owner);
    }

    //Funcion para ver servicios especiales disponibles
    function listSpecialServices() public view returns(string[] memory){
        require(statusContract , "No active contract");
        return IPrincipalContract.showActivedSpecialServices();
    }

    //Funcion ver detalles de un servicios especiales
    function detailsSpecialService(string memory _name) public  view returns(string memory , uint16 , bool){
       require(statusContract , "No active contract");
       return IPrincipalContract.showSpecialServiceDetails(_name);
    }
}