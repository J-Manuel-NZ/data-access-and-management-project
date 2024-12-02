import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;