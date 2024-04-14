const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
    isRead: Object,
}, { 
    timestamps: true,
    strict: false 
});


module.exports = mongoose.model('ChatMessage', chatMessageSchema);
