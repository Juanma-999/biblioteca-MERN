import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
        title: { type: String, require: true },
        text: { type: String, require: true },
        read: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

export const Notification = mongoose.model('Notification', notificationSchema)