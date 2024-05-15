const express = require("express")
const app = express()
const mongoose = require("mongoose")
const auth = require("./routers/auth")
const http = require('http');
const {Server} = require("socket.io")
const {getAllMessage} = require("./functions/users")
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"]
    }
})


const users = async (socket, data) => {
    const { user1, user2, message } = data;
  
    const schemaKey = [user1, user2].sort().join('');
  
    let newUsers;
  
    if (!mongoose.models[schemaKey]) {
        const usersSchema = new mongoose.Schema({
            user: {
                type: String,
                trim: true,
            },
            message: {
                type: String,
            },
            date: {
                type: Date,
                default: new Date(),
            },
        });
  
        newUsers = mongoose.model(schemaKey, usersSchema);
    } else {
        console.log("deneme");
        newUsers = mongoose.model(schemaKey);
    }
  
    try {
        const newMessage = await newUsers.create({ user: user1, message: message });

            const messages = await mongoose.models[schemaKey].find()
            io.emit(schemaKey, messages || []);
       
    } catch (error) {
        console.error("Error creating message:", error);
    }
  };
  
app.use("/api" , auth)


io.on('connection', (socket) => {
    console.log('Bir istemci bağlandı.');

    
    socket.on('users', (data) => users(socket, data));
   socket.on('getAllMessage', (data) => getAllMessage(socket, data));

    socket.on('disconnect', () => {
        console.log('Bir istemci ayrıldı.');
    });
});

const MONGO_URI = "mongodb+srv://eyupCetin:12345@eyupcetin.j24djvy.mongodb.net/question-answer?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI)
.then(()=>{
    server.listen(5000 , ()=>{
    
    console.log("server running")
})
})
.catch((err) => console.log(err))

