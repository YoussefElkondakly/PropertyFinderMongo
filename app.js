process.on('uncaughtException',e=>console.log(e))
const express=require('express')
const userRoutes=require('./routes/userRoutes')
const appRoutes=require('./routes/appRoutes')
const {protect}=require('./controller/authController')
const AppError=require('./utils/appError')
const app=express()

function errController(){
  return  app.use((err,req,res,next)=>{
        console.log(err)
    })
}
app.use('/matchingSystem/users',userRoutes)
app.use('/matchingSystem/users',protect,appRoutes)

app.all('*',(req,res,next)=>{
    const err=new AppError("Not Found",404)
    next(err)
})
app.use(errController)
module.exports=app