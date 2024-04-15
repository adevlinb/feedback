const Chat = require('../../models/chat');
const ChatMessages = require('../../models/chatMessage');

module.exports = {
    getChatMessages,
    getUserChats,
    createChat,
    addMessage
};

async function createChat(req, res) {
    try {
        // add logged in user to members && check if chat with these exact members exists already
        req.body.chatMembers[req.profile._id] = true;
        const members = [...Object.keys(req.body.chatMembers)]
        const chatInDb = await Chat.exists({ "members": { $all: members, $size: members.length }});

        // find or create chat
        let chat;
        if (chatInDb) chat = await Chat.findOne({ "members": { $all: members, $size: members.length}});
        else chat = await Chat.create({ chatName: req.body.formData.chatName, members: members, lastMsg: Date.now()});

        // create new msg and add to chat
        const newMsg = await ChatMessages.create({ chatId: chat._id, message: req.body.formData.message, sender: req.profile._id, isRead: req.body.chatMembers });
        chat.msgs.push(newMsg);
        chat.lastMsg = Date.now();
        await chat.save();

        // send back updated userChats and msgs for the specific chat
        const userChats = await Chat.find({"members": {$in: req.profile._id}}).populate("msgs", "isRead").sort({'lastMsg': "desc"});
        const allMessages = await ChatMessages.find({ chatId: chat._id }).sort({'createdAt': "asc"});
        res.status(200).json([userChats, allMessages, chat]);
    } catch (err) {
        console.log(err, "err")
        res.status(500).json(err);
    }
}

async function getChatMessages(req, res) {
    try {
        const docs = await ChatMessages.updateMany({ chatId: req.params.chatId, [`isRead.${req.profile._id}`]: false }, { [`isRead.${req.profile._id}`]: true });
        const chatMessages = await ChatMessages.find({ chatId: req.params.chatId }).populate([{ path: 'sender', transform: (doc, id) => ({ _id: doc._id, name: doc.name, pic: doc.currProfilePic?.url ? doc.currProfilePic?.url : null })}]).sort({'createdAt': "asc"});
        const userChats = await Chat.find({"members": {$in: req.profile._id}}).populate("msgs", "isRead").sort({'lastMsg': "desc"});
        res.status(200).json([chatMessages, userChats]);
    } catch (err) {
        console.log(err, "err")
        res.status(500).json(err);
    }
}

async function getUserChats(req, res) {
    try {
        const userChats = await Chat.find({"members": {$in: req.user._id}}).populate("msgs", "isRead").sort({'lastMsg': "desc"});
        res.status(200).json(userChats);
    } catch (err) {
        console.log(err, "err")
        res.status(500).json(err);
    }
}

async function addMessage(req, res) {
    try {
        req.body.members[req.profile._id] = true;
        const newMsg = await ChatMessages.create({ chatId: req.params.chatId, message: req.body.message, sender: req.profile._id, isRead: req.body.members });
        let chat = await Chat.findById(req.params.chatId);
        chat.msgs.push(newMsg);
        chat.lastMsg = Date.now();
        await chat.save();
        const updatedMsg = await ChatMessages.findById(newMsg._id).populate([{ path: 'sender', transform: (doc, id) => ({ _id: doc._id, name: doc.name, pic: doc.currProfilePic?.url ? doc.currProfilePic?.url : null })}]).sort({'createdAt': "asc"});
        const userChats = await Chat.find({"members": {$in: req.profile._id}}).populate("msgs", "isRead").sort({'lastMsg': "desc"});
        res.status(200).json([updatedMsg, userChats]);
    } catch (err) {
        console.log(err, "err")
        res.status(500).json(err);
    }
}
