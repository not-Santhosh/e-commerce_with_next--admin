import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {

        await connectToDB();

        const {title, description, image} = await req.json();

        const existingCollection = await Collection.findOne({title});
        
        if (existingCollection) {
            return new NextResponse("Collection already exist", {status: 400});
        }

        if (!image || !title) {
            return new NextResponse("Title and Image are required", {status: 400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        });

        await newCollection.save();

        return NextResponse.json(newCollection, {status: 200});
    } 
    catch (error) {
        console.log("COLLECTION_POST", error);        
    }
}

export const GET = async () => {
    try {
        await connectToDB();

        const collection = await Collection.find().sort({createdAt: "desc"});

        return NextResponse.json(collection, {status: 200});
        
    } catch (error) {
        return  new NextResponse("collection_GET", {status: 500})
    }
}