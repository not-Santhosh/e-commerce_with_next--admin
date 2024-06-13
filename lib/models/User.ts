import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    }
}, {timestamps: true});

const User =  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;