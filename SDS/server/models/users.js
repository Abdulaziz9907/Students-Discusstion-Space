const { default: mongoose } = require('mongoose');
const moongose= require('mongoose');

const UsersSchema= new moongose.Schema({

    userName: String,
    fName: String,
    lName: String,
    major: String,
    year: Number,
    password: String

})

const UsersModel= mongoose.model("users",UsersSchema)
module.exports= UsersModel