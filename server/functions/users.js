const mongoose = require("mongoose");

const users = async (req, res) => {
  const { user1, user2, message } = req.body;

  const schemaKey = [user1, user2].sort().join('');

  let newUsers;

  if (!mongoose.models[schemaKey]) {
    const usersSchema = new mongoose.Schema({
      user: {
        type: String,
        required: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: new Date(),
      },
    });

    newUsers = mongoose.model(schemaKey, usersSchema);
  } else {
    newUsers = mongoose.model(schemaKey);
  }

  try {
    const newMessage = await newUsers.create({ user: user1, message: message });
    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAllMessage = async(req , res)=>{
    const { user1, user2 } = req.body;
    const schemaKey = [user1, user2].sort().join('');
    console.log(schemaKey)

    if(mongoose.models[schemaKey]){
        const messages = await mongoose.models[schemaKey].find()
        res.status(200).json(messages || [])
        return messages || []
    }else{
        res.status(404).json({message : "error"})
        return []
    }
    

}

module.exports = { users , getAllMessage};
