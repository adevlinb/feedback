const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const uploadFile = require('../../config/upload-file');

module.exports = {
    create,
    login,
    getUser,
    uploadProfilePhoto,
    updateProfile
};

async function getUser(req, res) {
    try {
        res.json(req.user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.status(200).json(token);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch (err) {
        console.log(err)
        res.status(400).json('Bad Credentials');
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function updateProfile(req, res) {
    try {
        let updatedUser = await User.findOne({ _id: req.user._id});
        for (const [key, value] in Object.entries(req.body)) {
            updatedUser[key] = value
        }
        updatedUser = await updatedUser.save();
        return res.json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

async function uploadProfilePhoto(req, res) {
    try {
        if (req.file) {
            const photoURL = await uploadFile(req.file);            
            res.json({url: photoURL});
        } else {
            throw new Error('Must select a file');
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err.message);
    }
}