import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => {return parseFloat(v.toString())},
        required: true
    },
    media: [String],
    category: {
        type: String,
        required: true
    },
    collections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        },
    ],
    tags: [String],
    expense: {
        type: mongoose.Schema.Types.Decimal128,
        get: (v: mongoose.Schema.Types.Decimal128) => {return parseFloat(v.toString())},
        required: true
    },
    size: [String],
    color: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {toJSON:{getters: true}});

const Product =  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;