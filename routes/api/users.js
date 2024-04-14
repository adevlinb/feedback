const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const upload = require("multer")({ limits: { fieldSize: 25 * 1024 * 1024 } });


// POST /api/users
router.get('/user', usersCtrl.getUser);

router.post('/', usersCtrl.create);

router.post('/login', usersCtrl.login);

router.put("/", usersCtrl.updateProfile)

router.post("/uploadProfilePhoto", upload.single('photo'), usersCtrl.uploadProfilePhoto)

module.exports = router;