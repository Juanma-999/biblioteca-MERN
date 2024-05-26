import mongoose from "mongoose";

const walkSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },
        dogs: [{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Dog"
        }],
        location: {
            type: String,
            require: true,
        },
        frequency: {
            type: String,
            require: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

export const Walk = mongoose.model('Walk', walkSchema);
