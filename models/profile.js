const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    heading: { type: String, required: true, maxLength: 15 },
    // currPic: { type: String, default: "" },
    // picGallery: [{ type: Schema.Types.ObjectId, ref: 'Photo?' }],
    mediaGalleryPermission: { type: Boolean, default: false },
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);