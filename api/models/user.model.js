import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    gigs: {
        type: [String],
        required: false
    }
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;