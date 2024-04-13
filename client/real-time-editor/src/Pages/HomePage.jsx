import {useNavigate} from "react-router-dom"
import { useContext, useState } from "react"
import SocketContext from "../context/socket"
import joinValidation from "../utils/joinValidation"


function HomePage(){
    
    const [error,setError]=useState({roomIdErr:"",usernameErr:""})
    const [joinDetails,setJoinDetails]=useState({roomId:"",username:""})
    const navigate=useNavigate()
    const socket=useContext(SocketContext)
   
    function handleChange(e){
        setJoinDetails({...joinDetails,[e.target.name]:e.target.value})
    }

    function handleJoin(e){
        const joinError=joinValidation(joinDetails)
        if(+Object.keys(joinError).length > 0){
            setError({...joinError})
            return 
        }
        socket.emit("join-room",{roomId:joinDetails.roomId,username:joinDetails.username,socketId:socket.id})
        navigate(`/join/${joinDetails.roomId}`,{replace:true,state:joinDetails.username}) 
    }

    return(
        <div className="min-h-screen bg-black-light py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-black-extra-light shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl text-white font-poppins font-semibold">Paste invitation ROOM ID</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 flex flex-col text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="roomId" name="roomId" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 bg-black-extra-light text-white focus:outline-none focus:borer-rose-600" value={joinDetails.roomId} onChange={handleChange} placeholder="ROOM ID" />
                                    <label htmlFor="roomId" className="absolute left-0 -top-3.5 font-poppins text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Room ID</label>
                                    <p className="text-red-500 my-1">{error.roomIdErr}</p>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 bg-black-extra-light text-white focus:outline-none focus:borer-rose-600" value={joinDetails.username} onChange={handleChange} placeholder="Username" />
                                    <label htmlFor="username" className="absolute left-0 -top-3.5 font-poppins text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">Username</label>
                                    <p className="text-red-500 my-1">{error.usernameErr}</p>
                                </div>
                                <div className="relative self-end">
                                    <button onClick={handleJoin} className="bg-orange-500 text-white rounded-md px-4 py-1 hover:bg-orange-700">Join</button>
                                </div>
                                <div className="relative self-center">
                                    <p className="text-white">if you don't have an invite then create <span onClick={(e)=>setJoinDetails({...joinDetails,roomId:crypto.randomUUID().slice(0,12)})} className="text-orange-500 underline hover:cursor-pointer">new room</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage