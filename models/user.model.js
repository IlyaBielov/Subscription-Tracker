import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [32, "Name must be at most 32 characters long"]
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;