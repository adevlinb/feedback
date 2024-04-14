let users = {};

function chat(io) {

	io.on('connection', (socket) => {

		socket.on("set_user_online", (user) => {
			users[user._id] = user;
			io.sockets.emit("update_users", users);
		});

		socket.on("join_room", (user) => {
			users[user._id] = user
			socket.join(user.room);
			io.sockets.emit("update_users", users);
		})
		
		socket.on("leave_room", (roomId, userId) => {
			if (!userId in users) return;
			socket.leave(roomId)
			users[userId].room = null;
			io.sockets.emit("update_users", users);
		})

		socket.on('message', (msg) => {
			for (const member of Object.keys(msg.isRead)) {
				if (msg.sender._id === member)  {
					continue;
				}
				if (member in users && users[member].room === msg.chatId) {
					io.to(users[member].socket).emit("message", msg);
					continue;
				}
				if (member in users) {
					io.to(users[member].socket).emit("update_chats");
					continue;
				}
			}
		});

		socket.on('new_chat', (newChatMembers) => {
			for (const member of newChatMembers) {
				if (member in users)  {
					io.to(users[member].socket).emit("update_chats");
				}
			}
		});

		socket.on("join_book_chat", (bookId, user) => {
			users[user._id] = user;
			if (bookId in users) {
					if (!users[bookId].members.some(m => m._id === user._id)) {
						users[bookId].members.push(user);
						users[bookId].count += 1;
					}
			} else {
				users[bookId] = { "bookId": bookId, members: [], count: 1 }
				users[bookId].members.push(user);
			}

			io.sockets.emit("update_users", users);
		});
		
		socket.on("leave_book_chat", (bookId, user) => {
			users[user._id] = user
			if (bookId in users) {
				users[bookId].count -= 1;
				const updatedUsers = users[bookId].members.filter(m => m._id !== user._id);
				users[bookId].members = updatedUsers;
				if (users[bookId].count <= 0) delete users[bookId];
				io.sockets.emit("update_users", users);
			}
		});

		socket.on("set_user_offline", (user) => {
			if (user?._id in users) delete users[user._id]
			io.sockets.emit("update_users", users);
		});

		
	});
	
	io.on("disconnection", () => {
		// delete users[id];
		// userId = null;
		// socket.emit("updateUsers", users);

		socket.on("set_user_offline", (id) => {
			delete users[id];
			userId = null;
			socket.emit("updateUsers", users);
		})
	})
};

module.exports = chat;