const express = require('express');
const router = express.Router();
const chatCtrl = require('../../controllers/api/chat');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post("/", chatCtrl.createChat);

router.get("/user", chatCtrl.getUserChats);

router.get("/:chatId", chatCtrl.getChatMessages);

router.post("/:chatId/message", chatCtrl.addMessage);

module.exports = router;