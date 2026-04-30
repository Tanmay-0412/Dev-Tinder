// Logic to connect the database 
const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect(
    'mongodb+srv://tanmaysawant01_db_user:root%402001@notesapp.gwiaszp.mongodb.net/'
)}

module.exports = {
    connectDb
}


