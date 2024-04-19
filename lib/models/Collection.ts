import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection