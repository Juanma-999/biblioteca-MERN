import mongoose from "mongoose";

const dogSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            require: true,
        },
        breed: {
            type: String,
            require: true,
        },
        age: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Dog = mongoose.model('Dog', dogSchema);