const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, default: "" },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minlength: 3,
      required: true
    },
    mediaGalleryPermission: { type: Boolean, default: false },
    confirmationCode: {type: String, default: generateCode()},
    verified: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        },
        virtuals: true
    },
});

userSchema.pre('save', async function (next) {
    // 'this' is the user document
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

userSchema.virtual('formattedName').get(function () {
    return `${this.firstName[0].toUpperCase()}${this.firstName.slice(1)} ${this.lastName[0].toUpperCase()}${this.lastName.slice(1)}`
})

function generateCode() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token;
}

module.exports = mongoose.model('User', userSchema);