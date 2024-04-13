import { createContext} from "react"
import io from "socket.io-client"

const socketConn=io("http://localhost:8080/")
const SocketContext=createContext({})

console.log(socketConn)

export default SocketContext

export {socketConn}