import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);