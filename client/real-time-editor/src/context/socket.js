import { createContext} from "react"
import io from "socket.io-client"

const socketConn=io(`${window.location.origin}`)
const SocketContext=createContext({})

console.log(socketConn)

export default SocketContext

export {socketConn}