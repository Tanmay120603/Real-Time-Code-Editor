const roomsData=[]

exports.addRoomData=function(roomId){
    roomsData.push({roomId,editorText:"",users:[]})
}

exports.checkRoomExist=function(roomId){
    return roomsData.some(roomData=>roomData.roomId===roomId)
}

exports.getRoomData=function(roomId){
    return roomsData.find(roomData=>roomData.roomId===roomId)
}

exports.updateRoomEditorText=function(roomId,editorText){
    const id=roomsData.findIndex(roomData=>roomData.roomId===roomId)
    roomsData[id]["editorText"]=editorText
}

exports.deleteRoomData=function(roomId){
    const id=roomsData.findIndex(roomData=>roomData.roomId===roomId)
    roomsData.splice(id,1)
}

exports.addUser=function(roomId,username,socketId){
    const index=roomsData.findIndex(roomData=>roomData.roomId===roomId)
    roomsData[index]["users"].push({username,socketId})
    return roomsData[index]["users"]
}

exports.deleteUser=function(roomId,socketId){
    const index=roomsData.findIndex(roomData=>roomData.roomId==roomId)
    const updatedUsers=roomsData[index]["users"].filter(user=>user.socketId!==socketId)
    roomsData[index]["users"]=updatedUsers
    return updatedUsers      
}