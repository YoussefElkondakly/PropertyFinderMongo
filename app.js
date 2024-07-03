process.on('uncaughtException',e=>console.log(e))
const express=require('express')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const appRoutes=require('./routes/appRoutes')
const errController=require('./utils/errHandler')
const AppError=require('./utils/appError')
// const {protect}=require('./controller/authController')

const app=express()
const baseUrl = "/matchingSystem/propertyFinder/";
app.use(express.json())
// app.use()
app.use(baseUrl+"auth",authRoutes);
app.use(baseUrl+"user",userRoutes)
// app.use(baseUrl+'users',protect,appRoutes)

app.all('*',(req,res,next)=>{
    const err=new AppError(`Can't find ${req.originalUrl} on this server`,404)
    next(err)
})
app.use(errController)
module.exports=app