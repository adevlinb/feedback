import * as chatAPI from "./chat-api";
import { io } from 'socket.io-client';
//  "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
export const socket = io(URL);

let user = null;
let setMessages = null;
let setMyChats = null;
let setChatUsers = null;

// socket Config
export function socketConfig(userPro, func1, func2, func3) {
    // userInfo
    user = {
        _id: userPro._id,
        pic: userPro.currProfilePic ? userPro.currProfilePic.url : null,
        name: userPro.name,
        socket: socket.id,
        online: true,
        room: null,
    }

    // functions
    setMessages = func1;
    setMyChats = func2;
    setChatUsers = func3;

}

export function joinRoom(id) {
    user.room = id
    socket.emit("join_room", user);
}

export function leaveRoom(room) {
    const roomId = room ? room._id : null
    socket.emit("leave_room", roomId, user._id);
}

export function emitMessage(newMsg) {
    socket.emit("message", newMsg);
}

export function setUserOnline(room) {
    console.log("setting user online front end")
    const roomId = room ? room._id : null;
    socket.emit("set_user_online", { ...user, room: roomId });
}

export function newChat(newChat) {
    socket.emit("new_chat", newChat)
}

export function joinBookChat(bookId, rtcId) {
    user.room = bookId;
    socket.emit("join_book_chat", bookId, user);
}

export function leaveBookChat(bookId) {
    user.room = null;
    socket.emit("leave_book_chat", bookId, user);
}

export function userLogout() {
    socket.emit("set_user_offline", user);
}

socket.on('disconnect', function () {
    socket.emit("set_user_offline", user);
});

socket.on("update_users", function (updatedUsers) {
    if (user) setChatUsers(updatedUsers)
});

socket.on("message", async function (newMsg) {
    const [retrievedMessages, userChats] = await chatAPI.getMessages(newMsg.chatId);
    setMessages(retrievedMessages);
    setMyChats(userChats);
});

socket.on("update_chats", async function () {
    setMyChats(await chatAPI.getUserChats());
});


