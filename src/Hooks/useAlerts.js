import Swal from "sweetalert2";

const useAlerts = () => {
  const alertMessage = (message = 'Error', type = 'error') => {
    Swal.fire({
      title: type.toUpperCase(), 
      text: message, 
      icon: type, 
      confirmButtonColor: 'gray',
    });
  };

  return {
    alertMessage,
  };
};

export default useAlerts;
