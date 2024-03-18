const mongoose = require("mongoose")




const messageSchema  = new mongoose.Schema({

user : {
type : String,
require : true,

},

message : {
    type : String,
    trim : true,
    require : true
},

date : {
    type : Date,
    default : new Date()
}



})





module.exports = mongoose.model("message" , messageSchema)