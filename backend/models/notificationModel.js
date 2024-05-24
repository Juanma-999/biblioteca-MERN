import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        receiver: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
        requester: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
        walk: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Walk" },
        title: { type: String, require: true },
        read: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

export const Notification = mongoose.model('Notification', notificationSchema)