const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://sapthagireesh:Sapthag@projectsinfo.zxhsq4k.mongodb.net/?retryWrites=true&w=majority')
    }catch(error){
        console.log(error)
    }

}

module.exports = connectDB