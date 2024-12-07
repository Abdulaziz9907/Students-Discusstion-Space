const { default: mongoose } = require('mongoose');
const moongose= require('mongoose');

const UsersSchema= new moongose.Schema({

    userName: String,
    fName: String,
    lName: String,
    major: String,
    year: Number,
    password: String,
    ratings: Number,
    questions: Number,
    answers: Number,
    files: Number,
    discussions: Number,

})

const UsersModel= mongoose.model("users",UsersSchema)
module.exports= UsersModel