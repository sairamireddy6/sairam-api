const express = require('express')
const mongoose = require('mongoose')
const BrandName = require('./schema')
const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://sairamireddy:sairam@cluster0.ivjzptp.mongodb.net/?retryWrites=true&w=majority').then(
    ()=> console.log("DB connected....")
).catch(err => console.log(err));


app.post('/post', async (req, res) => {
    const {brandname} = req.body
    try{
        const newData = new BrandName({brandname})
        await newData.save()
        return res.json(await BrandName.find())
    }
    catch(err){   console.log(err.message) }
})

app.get('/', async (req, res) =>{
    try {
        const allData = await BrandName.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data)
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete('/delete/:id', async (req, res) =>{
    try {
        await BrandName.findByIdAndDelete(req.params.id)
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message)
    }
})


// Middleware

app.use('/middleware', async (req, res, next)=>{
    console.log("Middleware requested")
    next()
})

app.get('/middleware/request', async (req, res) =>{
    try {
        const allData = await BrandName.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})


app.listen(3000,()=>console.log("Server Running"))