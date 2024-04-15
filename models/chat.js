const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChatMessage = require("./chatMessage");

const chatSchema = new Schema({
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMsg: {type: Date, default: Date.now()},
    msgs: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});


chatSchema.virtual('UNREAD_MSGS').get(function() {
    const memberObj = this.members.reduce(function (acc, member) {
        acc[member._id] = 0;
        return acc;
    }, {})
    return this.msgs.reduce(function (acc, msg) {
        for (const member of Object.keys(msg.isRead)) {
            if (!msg.isRead[member]) acc[member] += 1; 
        }
        return acc;
    }, { ...memberObj });
});

module.exports = mongoose.model('Chat', chatSchema);
