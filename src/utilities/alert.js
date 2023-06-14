import { ToastContainer, toast } from 'react-toastify';
const alertSuccess=(msg)=>{
    toast.success(`🦄 ${msg}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}
const alertWarning=(msg)=>{
    toast.warn(`🦄 ${msg}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
export {alertSuccess,alertWarning,isEmpty}