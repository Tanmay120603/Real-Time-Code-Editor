import {useParams,useNavigate,useLocation} from "react-router-dom"
import InitialsAvatar from "react-initials-avatar"
import CodeEditor from "../Components/Editor"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {toast} from "react-toastify"
import SocketContext from "../context/socket"
import { AiOutlineMenuUnfold } from "react-icons/ai";

function EditorPage(){
    
    const navigate=useNavigate()
    const location=useLocation()
    const params=useParams()
    const [result,setResult]=useState()
    const [resultLoading,setResultLoading]=useState("")
    const [users,setUsers]=useState([])
    const [editorValue,setEditorValue]=useState("")
    const socket=useContext(SocketContext)
    const [openSideBar,setOpenSideBar]=useState(false)

    useEffect(()=>{

        if(sessionStorage.getItem("isRefresh")){
            navigate("/")
        }
        else{
            sessionStorage.setItem("isRefresh",true)
        }

        const beforeUnload=(e)=>{
            socket.emit("leave-room",{username:location.state,roomId:params.roomID,socketId:socket.id})
        }

        window.addEventListener("beforeunload",beforeUnload)

        socket.on("joined-room",({username,users,editorText,socketId})=>{
            toast.success(`${socketId==socket.id ?"You":username} have joined the room`)
            setUsers(users)
            setEditorValue(editorText)
          })

          socket.on("leaved-room",({username,users})=>{
            toast.success(`${username} has left the room`)
            setUsers(users)
          })

          return function(){
            window.removeEventListener("beforeunload",beforeUnload)
            sessionStorage.removeItem("isRefresh")
            socket.off("joined-room")
            socket.off("leaved-room")
          }
    },[])

    async function handleRunCode(){
        setResultLoading("Compiling the code")
        try{
            const responseSubmit=await axios.request({method:"POST",url:import.meta.env.VITE_SERVER_ENDPOINT+"code/compile",data:{code:btoa(editorValue)}})
            setResultLoading("Code has been compiled wait few seconds to see result")
            const responseResult=await axios.request({method:"POST",url:import.meta.env.VITE_SERVER_ENDPOINT+"code/result",data:{token:responseSubmit.data.token}})
            setResult(responseResult.data.stdout || responseResult.data.stderr)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setResultLoading(false)
        }
    }

    function handleCopy(e){
        e.target.textContent="Copied"
        setTimeout(()=>e.target.textContent="Copy ROOM ID",400)
        navigator.clipboard.writeText(params.roomID)
    }

    function handleLeave(){
     socket.emit("leave-room",{username:location.state,roomId:params.roomID,socketId:socket.id})
     navigate("/")   
    }

    return(
    <div className="h-[100vh]">
    <AiOutlineMenuUnfold color="black" size={24} className={`lg:hidden ${openSideBar && "hidden"} bg-white rounded absolute left-1 top-1 z-50 hover:cursor-pointer`} onClick={()=>setOpenSideBar(true)}/>
    <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${openSideBar ? "translate-x-0":"-translate-x-full"} lg:translate-x-0`} aria-label="Sidebar">
   <div className="h-full px-3 flex flex-col py-4 overflow-y-auto justify-between bg-black-extra-light dark:bg-gray-800">
    <div>
    <div className="flex justify-between">
    <h3 className="font-poppins font-bold text-white mb-2">Connected</h3>
    <button className={`lg:hidden bg-red-600 text-white rounded px-4 -mt-2 hover:bg-white hover:text-red-600`} onClick={()=>setOpenSideBar(false)}>X</button>
    </div>
    <div className="flex w-full flex-wrap gap-y-3 gap-x-4">
        {
        users.map(user=><div key={user.socketId} className="flex flex-col gap-1"><InitialsAvatar name={user.username} className={`${user.socketId==socket.id ? "bg-green-800":"bg-orange-900"} w-14 self-center h-14 rounded flex justify-center items-center text-white`}></InitialsAvatar>
        <p className="text-white font-poppins text-sm text-center">{user.username}</p>
        </div>)
        }
    </div>
    </div>
    <div className="w-full h-1/6 flex flex-col justify-center gap-4 items-center">
    <button className="w-10/12 bg-white bg-opacity-100 text-black font-poppins font-semibold rounded-md py-2 hover:bg-white hover:bg-opacity-70" onClick={handleCopy}>Copy ROOM ID</button>
    <button className="w-10/12 bg-orange-500 text-white font-poppins font-semibold rounded-md py-2 hover:bg-orange-700" onClick={handleLeave}>Leave ROOM</button>
   </div>
   </div>
</aside>

<div className="h-full flex lg:ml-64">
   <div className="lg:p-4 px-2 py-8 sm:px-4 h-full bg-black-light lg:w-8/12 w-6/12 dark:border-gray-700">
    <CodeEditor editorValue={editorValue} setEditorValue={setEditorValue}/>
   </div>
   <div className="bg-black-extra-light flex flex-col justify-start py-4 px-2 gap-4 items-center h-full lg:w-4/12 w-6/12">
   <div className="mb-2"><button className="px-5 py-3 rounded-xl text-sm font-medium text-white bg-orange-600 hover:bg-orange-800 active:bg-grey-900 focus:outline-none border-4 border-white focus:border-purple-200 transition-all" onClick={handleRunCode}><i className="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>Run Code</button></div>
    <div className="w-full text-white md:p-4 p-2 bg-black h-3/4">
    <h2 className="font-poppins md:text-2xl text-xl mb-1">Output:</h2>
        <p className="md:p-4 p-2 md:text-lg text-base font-output bg-white h-3/4 overflow-y-auto text-black">{resultLoading || result}</p>
    </div>
   </div>
</div>
</div>
    )
}

export default EditorPage