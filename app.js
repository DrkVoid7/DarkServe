import mongoose from 'mongoose';
import express from "express"
import User from './user.js';
const app = express()
const port = 3000
mongoose.connect('mongodb+srv://drkvoid07:tuu6sc1OHXLTwu5o@serve1.fmyl3.mongodb.net/')
// mongoose.connect("mongodb://localhost:27017/")
app.use(express.json()) //accepts data in json format
app.use(express.urlencoded()) //this is to decode data sent by form
app.use(express.static("views"))
app.set('view engine', 'ejs')

async function m(req, res, next) {
const body = req.body
console.log(body);
const data = await User.findOne({ username: body.username })
if(!data){
    res.render("index", {
        f_name: body.f_name,
        l_name: body.l_name,
        username: body.username,
        token: body.token,
        email: body.email,
        country: body.c,
        number: body.number,
        desc: body.Description,
        error: "Username not found!"
      })
      return
}
else if(body.token != data.staff_info.token){
  res.render("index", {
    f_name: body.f_name,
    l_name: body.l_name,
    username: body.username,
    token: body.token,
    email: body.email,
    country: body.c,
    number: body.number,
    desc: body.Description,
    error: "Token is Invalid!"
  })
  return
}
else{
  await User.updateOne({username: body.username}, {$set:{is_edited:true,contact:{
    f_name: body.f_name,
    l_name: body.l_name,
    phone: body.number,
    email: body.email,
    country: body.c,
},
    staff_info:{
    desc: body.Description,
    profession_1:body.p1,
    profession_2:body.p2,
    profession_3:body.p3,
    profession_3:body.p4,
    rating:{
      all: []
    },
    token: "",
  }}})
}
res.send("Success!")
next
}

app.get('/', (req, res) => {
    res.render("index", {
        f_name: null,
        l_name: null,
        username: null,
        token: null,
        email: null,
        country: null,
        number: null,
        desc: null,
        error: " ",
      })
}
)
app.post("/signup", m, (req, res)=>{
 res.send("done")
})
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
