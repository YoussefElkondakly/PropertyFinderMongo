const express =require('express');
const router = express.Router()
//implement the Global MiddleWare that checks if the user is logged in 
//if there is a or an repeated routes I'll make another file 
// router.get('/hello',(req,res)=>{res.end("Hello")})
module.exports = router