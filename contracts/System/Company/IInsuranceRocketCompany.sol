// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

interface InterfaceRocket {

    //---------------------------------------Events---------------------------------------
    //Evento para notificar una recarga de tokens al contrato
    event rechargeTokensEvent(uint16);
    //Evento para notificar el cambio de estado de un servicio
    event changeStatusServiceEvent(string);
    //Evento para notificar un servicio creado
    event createServiceEvent(string);
    //Evento para notificar cuando se habilita un cliente o laboratorio
    event enableSubscriptionEvent(string);
    //Evento para notificar cuando se crea un contrato apra cliente
    event createFactoryEvent(string, address);
    //Evento servicio asginado a un usuario
    event asignServiceClientEvent (string , address);
    
    //---------------------------------------Structs---------------------------------------
    //Servicios ofrecidos (precio y estado)
    struct Service {
        uint16 priceService;
        bool statusService;
    }

    //Servicios especiales brindados por laboratios
    struct SpecialService {
        uint16 priceService;
        bool statusService;
        address laboratory;
    }

    //Solicitudes (tipo, estado)
    struct Request {
        uint16 requestType;
        bool statusRequest;
        address addressContract;
    }

    //---------------------------------------Funciones---------------------------------------
    //Funcion para recargar tokens al contrato
    function rechargeTokens(uint16 _amount) external;

    //Funcion para ver el listado de servicios activos
    function showActivedServices() external returns(string[] memory);

    //Funcion para mostrar un servicio por su nombre
    //function showService(string memory _name) external returns(Service memory);
    function showServiceDetails(string memory _name) external returns(string memory , uint16 , bool);

    //Funcion para crear servicios
    function createService(string memory _name, uint16 price) external;

    //Funcion para cambiar el estado de los servicios
    function changeStatusService(string memory _name) external;

    //Funcion para convertir el precio de tokens a ethers
    /* function tokenToEthers(uint16 _quantity) external pure returns(uint16); */

    //Funcion para solicitar una suscripcion para un cliente
    function requestSubscriptionClient() external;

    //Funcion para solicitar una suscripcion para un laboratorio
    function requestSubscriptionLaboratory() external;

    //Funcion para habilitar un cliente o laboratorio
    function enableSubscription(address _addr) external;

    //Funcion para ver las solicitudes pendientes
    function showPendingRequest(string memory _type) external view returns(address[] memory);
}