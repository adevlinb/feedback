let users = {};

function chat(io) {

	io.on('connection', (socket) => {
		socket.on("socket reset server", () => {
			io.sockets.emit("socket reset client");
		})

		socket.on("set_user_online", (user) => {
			console.log(user, "user in set user online func")
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
				if (msg.sender._id === member) {
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
				if (member in users) {
					io.to(users[member].socket).emit("update_chats");
				}
			}
		});

		socket.on("set_user_offline", (user) => {
			if (user?._id in users) delete users[user._id]
			io.sockets.emit("update_users", users);
		});


	});

	io.on("disconnection", (user) => {
		if (user?._id in users) delete users[user._id]
		io.sockets.emit("update_users", users);
	})
};

module.exports = chat;