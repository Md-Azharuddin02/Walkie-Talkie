const MessageModel = require('../Model/Users');

async function getMessages(req, res){
    try{
        const messagesData = await MessageModel.find({});
        res.status(200).json(messagesData)
    }
    catch(error){
        res.status(500).json({error: 'Failed to fetch messages'});
    }
}

async function sendMessage(req, res){
    const message= req.body
    try{
        const newMessage= new MessageModel(message);
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch(error){
        res.status(500).json({error: 'Failed to send message'});
    }
}

const hangleSaveMessage= async (message)=>{
    try{
      const newMessage = new MessageModel({
        text: message,
        createdAt: new Date(),
      });
      await newMessage.save();
      console.log("Message saved to database");
    }catch(error){
      console.error("Error saving message:", error);
    }
  }
module.exports = {getMessages,sendMessage, hangleSaveMessage};
