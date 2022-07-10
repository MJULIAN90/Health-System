// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "./InsuranceRocketCompany.sol";

contract Laboratory{
    address public owner;
    address private addressContract;
    bool public statusContract;
    InsuranceRocketCompany private IPrincipalContract;

    constructor(address _addr, address _addressContract) {
        owner = _addr;
        addressContract = address(this);
        IPrincipalContract =InsuranceRocketCompany(payable(_addressContract));
        statusContract = true;

    }

    //-----------------------------------------Events----------------------------------------------
    //Evento para el cambio de status del contrato
    event changeStatusEvent(string);

    //Evento para cuando se crea un servicio especial
    event createSpecialServiceEvent(string);

    //Evento para cambiar el estado de los servicio especiales
    event changeStatusServiceLaboratoryEvent(string);

    //Evento para cancelación de contrato de laboratorio
    event cancelContractLaboratoryEvent(string);

    //Evento para canjear tokens por dinero
    event withdrawBalanceLaboratoryEvent(string);

    //Funcion cancelar contrato
    function changeStatus() external {
        statusContract = false;
        // emit changeStatusEvent("Contract has been cancelled");
    }

    //Funcion para crear los servicios ofrecidos
    function createSpecialService(string memory _name, uint16 _price) public {
        require(statusContract, "No active contract");
        IPrincipalContract.createSpecialService(_name, _price, owner);
        emit createSpecialServiceEvent("special service created");
    }

    //Funcion para cambiar el estado de los servicios especiales
    function changeStatusServiceLaboratory(string memory _name) public {
        require(statusContract, "No active contract");
        IPrincipalContract.changeStatusServiceLaboratory(_name, owner);
        emit changeStatusServiceLaboratoryEvent("Status changed");
    }

    //Funcion cancelar contrato de laborario
    function cancelContractLaboratory() public{
        require(statusContract, "No active contract");
        IPrincipalContract.cancelContractLaboratory(owner);
        emit cancelContractLaboratoryEvent("Laboratory contract cancelled");
    }

    //Funcion para canjear sus tokens por dinero
    function withdrawBalanceLaboratory(uint16 _quantityTokens) public payable {
        require(statusContract, "No active contract");
        IPrincipalContract.withdrawBalanceLaboratory(owner, _quantityTokens);

    }
    
    //Funcion para ver el balance del laboratorio
    function balanceLaboratory() public  view returns(uint){
        require(statusContract, "No active contract");
        return  IPrincipalContract.balanceContractUser(addressContract);
    }

    //Funcion para ver servicios especiales disponibles
    function listSpecialServices() public view returns(string[] memory){
        require(statusContract , "No active contract");
        return IPrincipalContract.showMyActivedSpecialServices();
    }
}