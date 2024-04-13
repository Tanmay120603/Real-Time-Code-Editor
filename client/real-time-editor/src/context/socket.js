import { createContext} from "react"
import io from "socket.io-client"

const socketConn=io(import.meta.env.VITE_SERVER_ENDPOINT)
const SocketContext=createContext({})

console.log(socketConn)

export default SocketContext

export {socketConn}