import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },

    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseId: String
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Course'
        }
    ],
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}


// generate Access Token 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.ACCESS_TOKEN!,
        { expiresIn: '5m' }
    )
}

// generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        process.env.REFRESH_TOKEN!,
        { expiresIn: '5m' }
    )
}


export const User = mongoose.models.User || mongoose.model('User', userSchema);