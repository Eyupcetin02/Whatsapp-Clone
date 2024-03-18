const express = require("express")
const app = express()
const mongoose = require("mongoose")
const auth = require("./routers/auth")
const message = require("./routers/message")
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())

app.use("/api" , auth)
app.use("/message" , message)








const MONGO_URI = "mongodb+srv://eyupCetin:12345@eyupcetin.j24djvy.mongodb.net/question-answer?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(5000 , ()=>{
    
    console.log("server running")
})
})
.catch((err) => console.log(err))

