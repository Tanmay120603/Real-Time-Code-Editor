function joinValidation({roomId,username}){
    const errObj={}
    
    if(!(/(.|\s)*\S(.|\s)*/.test(roomId))){
        errObj.roomIdErr="Room ID can't be blank"
    }
    else if(!(/^.{4,12}$/.test(roomId))){
        errObj.roomIdErr="Room ID should be between 4 to 12 characters"
    }
    else if(!(/^[a-zA-Z0-9_-]+$/.test(roomId))){
        errObj.roomIdErr="Room ID can't have special characters [Only underscore,hypen is allowed]"
    }

    if(!(/(.|\s)*\S(.|\s)*/.test(username))){
        errObj.usernameErr="Username can't be blank"
    }
    else if(!(/^.{4,12}$/.test(username))){
        errObj.usernameErr="Username should be between 4 to 12 characters"
    }
    else if(!(/^[a-zA-Z0-9_ -]+$/.test(username))){
        errObj.usernameErr="Username can't have special characters [Only underscore,hypen,space is allowed]"
    }
    return errObj
}

export default joinValidation