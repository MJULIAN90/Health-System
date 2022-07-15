// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
import "../Token/ERC20.sol";
import "./IInsuranceRocketCompany.sol";
import "./InsuranceClientRocketCompany.sol";
import "./InsuranceLaboratoryRocketCompany.sol";

contract InsuranceRocketCompany is InterfaceRocket{
    //Token
    ERC20Rocket token;
    address public owner;
    address public addressContract;
    uint public counterServices;

    constructor() {
        token = new ERC20Rocket("MedicineRocket", "MR");
        token.mint(10000);
        counterServices = 0;
        owner = msg.sender;
        addressContract = address(this);
    }

    //Funcion Ether balance
    function BalanceContractEthers ()public view returns(uint){
        return addressContract.balance;
    }

    //---------------------------------------Modifiers---------------------------------------
    modifier onlyOwner {
        require(msg.sender == owner, "You do not have the necessary permissions to run this function");
        _;
    }

    modifier onlyLaboratories(address ownerLaboratory) {
        require (
            RequestStatus[ownerLaboratory].requestType == uint16(1) && RequestStatus[ownerLaboratory].statusRequest == true,
            "No laboratory permits"
        );
        _;
    }

    modifier onlyClient(address _userWallet){

        require (
            RequestStatus[_userWallet].requestType == uint16(0) && RequestStatus[_userWallet].statusRequest == true,
            "No client permissions"
        );
        _;        
    }

    //---------------------------------------Mappings---------------------------------------
    //Mapping para relacionar el nombre de un servicio con su estructura de datos
    mapping(string => Service) public Services;

    //Mapping para guardar los servicios especializados de laboratorios externos
    mapping(string => SpecialService) public SpecialServices;

    //Mapping que relaciona la address con la peticion
    mapping(address => Request) public RequestStatus;

    //Mapping que relacion un address de cada usuario con su historial de servicios
    mapping(address => string []) public servicesClientHistory;

    //Mapping que guarda todos los servicios usados y sus respetivos clientes y provedores
    mapping(uint => ServicesUsed) public ServicesUsedClient;

    //---------------------------------------Enums---------------------------------------
    //Enum para clasificar el tipo de peticion de suscripcion
    enum RequestType { CLIENT, LABORATORY }

    //---------------------------------------Arrays---------------------------------------
    //Array para almacenar el listado de los servicios
    string[] public listServices;

    //Array para almacenar el listado de los servicios especiales de los laboratorios
    string[] public listSpecialServices;

    //Array para almacenar las peticiones de suscripcion de clientes
    address[] requestMixed;

    //---------------------------------------Funciones validadoras---------------------------------------

    //Funcion para validar que el nombre de servicio ya no exista
    function checkRepeatService(string [] memory services, string memory _name) private pure returns(bool identifier){
        identifier = true;

        for(uint i = 0; i < services.length; i++){
            if(keccak256(abi.encodePacked(services[i])) == keccak256(abi.encodePacked(_name))){
                identifier = false;
            }
        }
    }

    //Funcion para saber si una address ya tiene una peticion
    function checkRepeatRequest() private view returns(bool identifier){
        identifier = true;

        for(uint i = 0; i < requestMixed.length; i++){
            if(requestMixed[i] == msg.sender){
                identifier = false;
            }
        }
    }

    //---------------------------------------Funciones de tokens----------------------------------------------------

    //Funcion para recargar tokens al contrato
    function rechargeTokens(uint16 _amount) public override onlyOwner {
        token.mint(_amount);

        // emit rechargeTokensEvent(_amount);
    }

    //Funcion ver tokens de contrato principal
    function balanceContractTokens() public view returns(uint){
        uint balance = token.balanceOf(addressContract);

        return balance;
    }

    //Funcion para convertir el precio de tokens a ethers
    function tokenToGwei(uint _quantity) private pure returns(uint){
        return _quantity * (1 gwei);
    } 

    //Funcion para comprar tokens
    function buyTokens(uint _quantity, address ownerClient) public payable {
        require(RequestStatus[ownerClient].addressContract == msg.sender, "You do not have permissions to run this operation");

        uint cost = tokenToGwei(_quantity);
        require(msg.value >= cost, "You need more ethers to buy this amount of tokens.");

        uint returnValue = msg.value - cost;
        payable(ownerClient).transfer(returnValue);
        token.transfer(msg.sender, _quantity );
    }

    //Funcion para recibir pagos
    receive() external payable{}
    fallback ()external payable{}

    //---------------------------------------Funciones para contrato principal---------------------------------------

    //Funcion para ver el listado de servicios activos
    function showActivedServices() public view override returns(string[] memory){
        string[] memory activedServices = new string[] (listServices.length);
        uint16 counter = 0;

        for(uint16 i = 0; i < listServices.length; i++){
            if(Services[listServices[i]].statusService == true){
                activedServices[counter] = listServices[i];
                counter++;
            }
        }

        return activedServices;       
    }

    //Funcion para ver el listado de servicios especiales activos
    function showActivedSpecialServices() public view returns(string[] memory){
        string[] memory activedServices = new string[] (listSpecialServices.length);
        uint16 counter = 0;

        for(uint16 i = 0; i < listSpecialServices.length; i++){
            if(SpecialServices[listSpecialServices[i]].statusService == true){
                activedServices[counter] = listSpecialServices[i];
                counter++;
            }
        }

        return activedServices;       
    }

    //Funcion para mostrar un servicio por su nombre
    function showServiceDetails(string memory _name) public view override returns(string memory, uint16, bool){
        return (_name, Services[_name].priceService, Services[_name].statusService);
    }

    //Funcion para mostrar un servicio por su nombre
    function showSpecialServiceDetails(string memory _name) public view  returns(string memory, uint16, bool){
        return (_name, SpecialServices[_name].priceService, SpecialServices[_name].statusService);
    }

    //Funcion para revisar el numero de contrato de cada cliente
    function checkNumberContract() public view returns(address){
        return RequestStatus[msg.sender].addressContract;
    }

    //Funcion para ver saldo de Cliente
    function balanceContractUser(address _addr) public view returns (uint){
        return token.balanceOf(_addr);
    }


    //Funcion para saber el role y el status de cada usuario o laboratorio
    function showStatusAndRole() public view returns(uint16, bool, bool, string memory){
        return (RequestStatus[msg.sender].requestType, RequestStatus[msg.sender].statusRequest, RequestStatus[msg.sender].isRequest, RequestStatus[msg.sender].statusContract );
    }

    //change status contract clients or laboratory
    function changeStatusContract(address _userWallet) external payable {

        require(RequestStatus[_userWallet].addressContract == msg.sender, "You do not have permissions to run this operation");

        RequestStatus[_userWallet].statusContract = 'inactive';

        if (token.balanceOf(msg.sender) > 0 ) {
            uint balanceUserTokens = token.balanceOf(msg.sender);
            token.transferTokenRocket(msg.sender,addressContract, balanceUserTokens );
            payable (_userWallet).transfer(tokenToGwei(balanceUserTokens));
        }
    }

    //---------------------------------------Funciones para el admin ---------------------------------------

    //Funcion para ver las solicitudes pendientes
    function showPendingRequest(string memory _type) public view override onlyOwner returns(address[] memory) {
        require(keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked("Client")) || keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked("Laboratory")), "El tipo ingresado no es correcto");
        
        uint16 counter;
        address[] memory pendingRequests = new address[] (requestMixed.length);

        if(keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked("Client"))){
            for(uint16 i = 0; i < requestMixed.length; i++){
                if(RequestStatus[requestMixed[i]].statusRequest == false && RequestStatus[requestMixed[i]].requestType == uint16(0)){
                    pendingRequests[counter] = requestMixed[i];
                    counter++;
                }
            }
        }else{
            for(uint16 i = 0; i < requestMixed.length; i++){
                if(RequestStatus[requestMixed[i]].statusRequest == false  && RequestStatus[requestMixed[i]].requestType == uint16(1)){
                    pendingRequests[counter] = requestMixed[i];
                    counter++;
                }
            }
        }
        return pendingRequests;
    }

    //Funcion para habilitar un cliente o laboratorio
    function enableSubscription(address _addr) public override onlyOwner{
        RequestStatus[_addr].statusRequest = true;
        RequestStatus[_addr].isRequest = true;
        RequestStatus[_addr].statusContract = 'acepted';
    }

    //Funcion para cambiar el estado de los servicios
    function changeStatusService(string memory _name) public override onlyOwner{
        Services[_name].statusService = !Services[_name].statusService;
    }

    //Funcion para crear servicios
    function createService(string memory _name, uint16 _price) public override onlyOwner{
        require(checkRepeatService(listServices, _name), "Service name already exists.");

        Services[_name] = Service(_name, _price, true);

        listServices.push(_name);
    }

    //Funcion para mostrar los servicios basicos disponibles
    function showListServices() public view returns(string [] memory ){
        return listServices;
    }

    //Funcion para mostrar los servicios basicos disponibles
    function showListUsers() public view returns(address [] memory ){
        return requestMixed;
    }

    //Funcion para ver detalles de cada usuario sean clientes o laboratorios
    function showDetailsUser (address _addr) public view returns (uint16, bool, address, string memory ){
        return (RequestStatus[_addr].requestType, RequestStatus[_addr].statusRequest, RequestStatus[_addr].addressContract, RequestStatus[_addr].statusContract);
    }

    //Funcion para banear un cliente o laboratorio
    function bannedUser(address _addr) public onlyOwner{
        RequestStatus[_addr].statusContract = 'banned';
    }

    //Funcion para desbanear un cliente o laboratorio
    function unBannedUser(address _addr ) public onlyOwner{
        RequestStatus[_addr].statusContract = 'active';
    }

    //---------------------------------------Contrato clientes---------------------------------------

    //Funcion para solicitar una suscripcion para un cliente
    function requestSubscriptionClient() public override {
        require(checkRepeatRequest(), "You already have a request to your address.");
        RequestStatus[msg.sender] = Request(uint16(RequestType.CLIENT), false, address(0), false, 'initial');
        requestMixed.push(msg.sender);
    }

    //Funcion para creacion de contrato de Cliente
    function createClientFactory() public {
        require(RequestStatus[msg.sender].statusRequest == true && RequestStatus[msg.sender].requestType == 0, "You are not enabled to create your contract or your contract type does not match.");

        address clientAddressContract = address(new Client(msg.sender, addressContract));
        RequestStatus[msg.sender].addressContract = clientAddressContract;
        RequestStatus[msg.sender].statusContract = 'active';
        emit createFactoryEvent("Contract created", clientAddressContract);
    }

    // Funcion para asginar un servicio a un cliente
    function asignServiceClient(string memory _nameService, address _owner) external onlyClient(_owner) {
        require(RequestStatus[_owner].addressContract == msg.sender, "You do not have permissions to run this operation");
        require (Services[_nameService].statusService == true, "Service not available");
        require (Services[_nameService].priceService <= token.balanceOf(msg.sender), "Does not have sufficient funds");

        token.transferTokenRocket(msg.sender, addressContract, Services[_nameService].priceService);
        servicesClientHistory[msg.sender].push(_nameService);

        ServicesUsedClient[counterServices] = ServicesUsed(addressContract, msg.sender, 'basic', Services[_nameService].priceService, _nameService );
        counterServices++;
    }

    //Funcion para mostrar los servicios de un Cliente
    // function showServicesClient(address _userWallet) external view onlyClient(_userWallet) returns(string [] memory){
    //     return servicesClientHistory[msg.sender];
    // }

    //Funcion para asginar un servicio especial a un cliente
    function asignSpecialServiceClient(string memory _nameService, address _userWallet) external onlyClient(_userWallet) {
        require(RequestStatus[_userWallet].addressContract == msg.sender, "You do not have permissions to run this operation");
        require (SpecialServices[_nameService].statusService == true, "Service not available");
        require (SpecialServices[_nameService].priceService <= token.balanceOf(msg.sender), "Insufficient funds");

        token.transferTokenRocket(msg.sender,SpecialServices[_nameService].laboratory, SpecialServices[_nameService].priceService);
        servicesClientHistory[msg.sender].push(_nameService);

        ServicesUsedClient[counterServices] = ServicesUsed(SpecialServices[_nameService].laboratory, msg.sender, 'special', SpecialServices[_nameService].priceService, _nameService );
        counterServices++;
    }

    function showDetailServiceUsed(uint _position) public view returns(address, address, string memory, uint, string memory){
        return (ServicesUsedClient[_position].onwer, ServicesUsedClient[_position].client, ServicesUsedClient[_position].typeService, ServicesUsedClient[_position].price, ServicesUsedClient[_position].name);
    }

    //---------------------------------------Contratos laboratorios---------------------------------------

    //Funcion para solicitar una suscripcion para un laboratorio
    function requestSubscriptionLaboratory() public override {
        require(checkRepeatRequest(), "You already have a request to your address.");
        
        RequestStatus[msg.sender] = Request(uint16(RequestType.LABORATORY), false, address(0), false, 'initial');
        requestMixed.push(msg.sender);
    }

    //Funcion para crear el contrato de un laboratorio cuando ya está habilitado
    function createLaboratoryFactory() public {
        require(RequestStatus[msg.sender].statusRequest == true && RequestStatus[msg.sender].requestType == 1, "You are not enabled to create your contract or your contract type does not match..");

        address laboratoryAddressContract = address(new Laboratory(msg.sender, addressContract ));
        RequestStatus[msg.sender].addressContract = laboratoryAddressContract;
        RequestStatus[msg.sender].statusContract = 'active';

        emit createFactoryEvent("Contract created", laboratoryAddressContract);
    }

    //Funcion para crear servicios especiales
    function createSpecialService(string memory _name, uint16 _price, address ownerLaboratory) external onlyLaboratories(ownerLaboratory) {
        require(checkRepeatService(listSpecialServices, _name), "Service name already exists.");
        require(RequestStatus[ownerLaboratory].addressContract == msg.sender, "You do not have permissions to run this operation");

        SpecialServices[_name] = SpecialService(_price, true, msg.sender);
        listSpecialServices.push(_name);
    }

    //Funcion para cambiar el estado de los servicios especiales
    function changeStatusServiceLaboratory(string memory _name, address ownerLaboratory) external onlyLaboratories(ownerLaboratory){
        require(RequestStatus[ownerLaboratory].addressContract == msg.sender, "You do not have permissions to run this operation");

        SpecialServices[_name].statusService = !SpecialServices[_name].statusService;
    }

    //Funcion para mostrar lista de servicios especiales
    function showListServiceSpecial () public view returns (string [] memory){
        return listSpecialServices;
    }

    //Funcion para canjear sus tokens por dinero
    function withdrawBalanceLaboratory(address _laboratoryWallet, uint16 _quantityTokens) external payable onlyLaboratories(_laboratoryWallet) {
        require (token.balanceOf(msg.sender) > 0, "Insufficient balance");
 
        uint balanceLaboratyTokens = token.balanceOf(msg.sender);
        if(balanceLaboratyTokens >= _quantityTokens){
            token.transferTokenRocket(msg.sender, addressContract, _quantityTokens);
            payable(_laboratoryWallet).transfer(tokenToGwei(_quantityTokens));

            emit messageEvent ("your retirement has been successful");
        }else{
            emit messageEvent ("It does not have sufficient funds.");
        }
    }

    //Funcion para que cada laboratorio pueda ver sus servicios
    function showSpecialServicesByLaboratory() external view returns(string[] memory){
        string[] memory activedSpecialServices = new string[] (listSpecialServices.length);
        uint16 counter = 0;

        for(uint16 i = 0; i < listSpecialServices.length; i++){
            if(SpecialServices[listSpecialServices[i]].laboratory == msg.sender){
                activedSpecialServices[counter] = listSpecialServices[i];
                counter++;
            }
        }
        return activedSpecialServices;
    }
}