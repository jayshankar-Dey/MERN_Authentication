const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        require: [true, "email is required"],
        trim: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
        trim: true
    },
    profile: {
        url: String,
        public_id: String
    },
    Id: {
        type: String
    },
    otp: {
        type: Number
    },
    is_verify: {
        type: Boolean,
        default: false
    },
    is_google: {
        type: Boolean,
        default: false
    },
    is_Facebook: {
        type: Boolean,
        default: false
    }
})
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.generateToken = async function(exp) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: exp
    })
}

UserSchema.methods.compairePassword = async function(password) {
    return bcrypt.compare(password, this.password)
}

const Users = mongoose.model("Users", UserSchema)
module.exports = Users