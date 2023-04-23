const express = require('express')
const mongoose = require("mongoose")
const Student = require('./models')

mongoose.connect("mongodb://localhost:27017/vipsStudents")
.then(()=>console.log("Connected to db"))
.catch((e)=>console.log("Not connected to db"))

const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('static'))

app.get('/',async(req,res)=>{
    res.render("home",{students:[]})
})
app.post('/',async(req,res)=>{
    let not_null = {}
    for (const key in req.body) {
        if (req.body[key]) {
            not_null[key] = req.body[key]
        }
    }
    const students = await Student.find(not_null)
    res.render("home",{students})
})

app.post('/verify/:id',async(req,res)=>{
    const {id} = req.params
    const dateObj = new Date()
    const date = `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`
    await Student.findByIdAndUpdate(id,{$push:{checkedAt:date}})
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("Running on port 3000");
})