const express=require("express")
require("dotenv").config()
const cors=require("cors")
const {Server}=require("socket.io")
const http=require("http")
const codeRouter=require("./routes/code.js")["router"]
const { checkRoomExist,addRoomData,deleteRoomData,getRoomData,updateRoomEditorText,addUser,deleteUser} = require("./controller/room.js")
 
const server=express()
const httpServer=http.createServer(server)
const io=new Server(httpServer,{
    cors:{
        origin:"*",
    }
})

server.use(cors())
server.use(express.json())
server.use("/code",codeRouter)


io.on("connection",(socket)=>{
    socket.on("join-room",({roomId,username,socketId})=>{
        if(!(checkRoomExist(roomId)))addRoomData(roomId)
        socket.join(roomId)
        const usersArr=addUser(roomId,username,socketId)
        const {editorText}=getRoomData(roomId)
        io.in(roomId).emit("joined-room",{username,users:usersArr,editorText,socketId})
    })
    socket.on("send-message",({roomId,editorValue})=>{
        updateRoomEditorText(roomId,editorValue)
        socket.to(roomId).emit("receive-message",editorValue)
    })
    socket.on("leave-room",({username,roomId,socketId})=>{
        const usersArr=deleteUser(roomId,socketId)
        if(usersArr.length==0)deleteRoomData(roomId)
        socket.leave(roomId)
        socket.to(roomId).emit("leaved-room",{username,users:usersArr})
    })
})

httpServer.listen(process.env.PORT)