const mongoose = require("mongoose")



const authSchema = new mongoose.Schema({

username : {
    type: String,
},

email : {
    type : String
},

password : {
    type: String
},
})




module.exports = mongoose.model("messageauth" , authSchema)