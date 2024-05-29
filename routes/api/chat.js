const express = require('express');
const router = express.Router();
const chatCtrl = require('../../controllers/api/chat');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post("/", ensureLoggedIn, chatCtrl.createChat);

router.get("/user", ensureLoggedIn, chatCtrl.getUserChats);

router.get("/:chatId", ensureLoggedIn, chatCtrl.getChatMessages);

router.post("/:chatId/message", ensureLoggedIn, chatCtrl.addMessage);

module.exports = router;