const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");
const UsersModel=require("./models/users");

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://teamUser:teamPassword@cluster0.ehkp1.mongodb.net/SDSDB?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));



app.post('/login',(req,res)=>{

    const {userName, password} = req.body;
    UsersModel.findOne({userName: userName}).then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("incorrectPass")
            }
        }
        else{
            res.json("UsernotExist")
        }
    })

})

app.post('/signup', async (req, res) => {
    try {
        const existingUser = await UsersModel.findOne({ userName: req.body.userName });
        
        if (existingUser) {
            return res.json("Username already exists");

        }

        const newUser = await UsersModel.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json(err.message);
    }
});




app.listen(3002, ()=> {
    console.log("server is running")
})