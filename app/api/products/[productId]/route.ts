import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const GET = async(req:NextRequest, {params}: {params: {productId: string}}) => {
    try {        
        await connectToDB();

        const product = await Product.findById(params.productId).populate({path:"collections", model: Collection});
        
        return NextResponse.json(product, {status: 200});

    } catch (error) {
        return new NextResponse(`Internal Error: ${error}`, {status: 500})
    }
}

export const DELETE = async(req: NextRequest, {params} : {params: {productId: string}}) => {
    try {
        
        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse("Product not found", {status: 404})
        }

        await Product.findByIdAndDelete(params.productId);

        await Promise.all(
            product.collections.map((collectionId: string) => 
                Collection.findByIdAndUpdate(collectionId, {
                    $pull: {products: params.productId} 
                })
            )
        )


        return new NextResponse("Product deleted successfully", {status: 200});

    } catch (error) {
        console.log("ProductDelete_ERR", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

export const POST = async(req: NextRequest, {params} : {params: {productId: string}}) => {
    try {
        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse("Product not found", {status: 404})
        }

        const {collections, title, description, media, price, expense, tags, size, color} = await req.json();

        if (!title || !description || !media || !price || !expense) {
            return new NextResponse("Title, Description, media, Price and Expense are required", {status: 400})
            
        }

        const removedCollection = product.collections.filter((collectionId: string) => {
            return !collections.includes(collectionId);
        })

        const addedCollection = collections.filter((collectionId: string) => {
            return !product.collections.includes(collectionId);
        });

        await Promise.all([
            ...addedCollection.map(async (collectionId: string) => {
                await Product.findByIdAndUpdate(params.productId, {
                    $push: {
                        collections: collectionId
                    }
                })
            }),
            ...removedCollection.map(async (collectionId: string) => {
                await Product.findByIdAndUpdate(params.productId, {
                    $pull: {
                        collections: collectionId
                    }
                })
            })
        ])

        const updatedproduct = await Product.findByIdAndUpdate(params.productId, {
            title,
            description,
            media,
            price,
            expense,
            tags,
            size,
            color
        }, {new: true}).populate({path:"collections", model: Collection});

        await updatedproduct.save();

        return NextResponse.json(updatedproduct, {status: 200});
        
    } catch (error) {
        return new NextResponse(`Internal Error: ${error}`, {status: 500})
    }
}