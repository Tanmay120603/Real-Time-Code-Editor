import Editor from '@monaco-editor/react';
import { useContext, useEffect,useState} from 'react';
import {useParams} from "react-router-dom"
import SocketContext from '../context/socket';

function CodeEditor({editorValue,setEditorValue}){

    const params=useParams()
    const [timeoutId,setTimeoutId]=useState()
    const socket=useContext(SocketContext)

    useEffect(()=>{
      socket.on("receive-message",editorValue=>{
        setEditorValue(editorValue)
      })
      return function(){ 
        socket.off("receive-message")
      }
    },[])


function setRealTimeData(value){
    socket.emit("send-message",{roomId:params.roomID,editorValue:value})
}

function debounce(func,delay,value){
    if(timeoutId){
        clearTimeout(timeoutId)
    }
    const id=setTimeout(()=>{
        func(value)
    },delay)
    
    setTimeoutId(id)
}

function handleEditorChange(value){
    setEditorValue(value)
    debounce(setRealTimeData,200,value)
}

  return(
  <Editor height="90vh" value={editorValue} onChange={handleEditorChange} theme='vs-dark' defaultLanguage="javascript" />
  )
}

export default CodeEditor