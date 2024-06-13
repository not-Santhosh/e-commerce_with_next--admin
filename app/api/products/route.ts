import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const POST = async(req: NextRequest) => {
    try {
        await connectToDB();

        const {title, media, description, category, price, expense, collections, tags, size, color, } = await req.json();

        if (!title || !media || !category || !price || !expense) {
            return new NextResponse("Title, Media, Category, Price and Expense are required", {status: 400});            
        }

        const product = await Product.create({
            title,
            media,
            category,
            price,
            expense,
            collections,
            tags,
            size,
            color,
            description
        });
        
        await product.save();

        if (collections) {
            for (const collectionId of collections) {
                const collection = await Collection.findById(collectionId);
                if (collection) {
                    collection.products.push(product._id);
                    await collection.save();
                }
            }
        }
        
        return NextResponse.json(product, {status: 200});

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export const GET = async() => {
    try {
        await connectToDB();

        const products = await Product.find()
        .sort({ createdAt: "desc" })
        .populate({ path: "collections", model: Collection });
        
        return NextResponse.json(products, {status: 200});

    } catch (error) {
        console.log("Products_ERR", error);
        return new NextResponse(`Internal Error: ${error}`, {status: 500})
    }
}