const axios=require("axios")
const https=require("https")
require('dotenv').config()

exports.complieCode=async function(req,res){
    const options = {
        method: 'POST',
        httpsAgent:new https.Agent({rejectUnauthorized:false}),
        url: process.env.X_RAPIDAPI_ENDPOINT,
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        },
        data: {
          language_id:63,
          source_code:req.body.code
        },
      }
    try{
    const response=await axios.request(options)
    res.status(201).json({token:response.data.token})
    }catch(err){
        res.status(400).json({message:err.message})
    }   
}

exports.output=async function(req,res){
    const options={method:"GET",
    headers:{
        'X-RapidAPI-Key':process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host':process.env.X_RAPIDAPI_HOST
    },
    httpsAgent:new https.Agent({rejectUnauthorized:false}),
    searchParams:{
            base64_encoded:true,
            fields:"*"
    },        
}
    try{
        const response=await axios.request(process.env.X_RAPIDAPI_ENDPOINT+req.body.token,options)
        res.status(200).json({stdout:response.data.stdout,stderr:response.data.stderr})
    }catch(err){
        res.status(400).json({message:err.message})
    }   
}
