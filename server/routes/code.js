const express=require("express")
const router=express.Router()
const codeController=require("../controller/code.js")
router
.post("/compile",codeController.complieCode)
.post("/result",codeController.output)

exports.router=router