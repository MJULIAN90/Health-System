// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

interface InterfaceRocket {

    //---------------------------------------Events---------------------------------------
    //Evento para notificar una recarga de tokens al contrato
    event rechargeTokensEvent(uint16);

    //Evento para notificar cuando se crea un contrato apra cliente
    event createFactoryEvent(string, address);

    //Evento para enviar mensajes
    event messageEvent (string);

    //---------------------------------------Structs---------------------------------------
    //Servicios ofrecidos (precio y estado)
    struct Service {
        string name;
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
        bool isRequest;
        string statusContract;
    }

    struct ServicesUsed {
        address onwer;
        address client;
        string typeService;
        uint price;
        string name;
    }

    //---------------------------------------Funciones---------------------------------------
    //Funcion para recargar tokens al contrato
    function rechargeTokens(uint16 _amount) external;

    //Funcion para ver el listado de servicios activos
    function showActivedServices() external returns(string[] memory);

    //Funcion para mostrar un servicio por su nombre
    function showServiceDetails(string memory _name) external returns(string memory , uint16 , bool);

    //Funcion para crear servicios
    function createService(string memory _name, uint16 price) external;

    //Funcion para cambiar el estado de los servicios
    function changeStatusService(string memory _name) external;

    //Funcion para solicitar una suscripcion para un cliente
    function requestSubscriptionClient() external;

    //Funcion para solicitar una suscripcion para un laboratorio
    function requestSubscriptionLaboratory() external;

    //Funcion para habilitar un cliente o laboratorio
    function enableSubscription(address _addr) external;

    //Funcion para ver las solicitudes pendientes
    function showPendingRequest(string memory _type) external view returns(address[] memory);
}