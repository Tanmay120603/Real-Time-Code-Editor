import {Outlet} from "react-router-dom"
import {useContext, useEffect} from "react"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocketContext from "../context/socket";

function RootLayout(){

    const socket=useContext(SocketContext)
    
    useEffect(()=>{
        return function(){
            socket.disconnect()
        }
    },[])

    return(
        <div>
            <Outlet></Outlet>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
        </div>
    )
}

export default RootLayout