const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const upload = require("multer")({ limits: { fieldSize: 25 * 1024 * 1024 } });


// POST /api/users
router.get('/user', ensureLoggedIn, usersCtrl.getUser);

router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

router.put("/", ensureLoggedIn, usersCtrl.updateProfile)

router.post("/uploadProfilePhoto", ensureLoggedIn, upload.single('photo'), usersCtrl.uploadProfilePhoto)

module.exports = router;