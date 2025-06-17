
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        sender: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        //message for one on one
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

        //message for the group.
        group: {type: mongoose.Schema.Types.ObjectId, ref: "Group"},


        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    });
    
    const MessageModel = mongoose.model("messages", messageSchema);
    
    module.exports = MessageModel;