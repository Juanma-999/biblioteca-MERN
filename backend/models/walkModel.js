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
        }
    },
    {
        timestamps: true,
    }
);

export const Walk = mongoose.model('Walk', walkSchema);