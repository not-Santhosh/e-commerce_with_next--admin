import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import { log } from "console";
import Product from "@/lib/models/Product";


export const GET = async( req: NextRequest, {params} : {params: {collectionId: string}}) => {
    try {
        await connectToDB();

        const collection = await Collection.findById(params.collectionId);

        if(!collection) {
            return new NextResponse(JSON.stringify({message: "Collection not found"}), {status: 404});
        }

        return new NextResponse(JSON.stringify(collection), {status: 200});

    } catch (error) {
        console.log("Collection_ERR",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export const POST = async (req: NextRequest, { params: { collectionId } }: { params: { collectionId: string } }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(collectionId, { title, description, image }, { new: true });

    if (!updatedCollection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedCollection), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (req:NextRequest, {params}: {params:  {collectionId: string}}) => {
    try {
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        await connectToDB();

        await Collection.findByIdAndDelete(params.collectionId);

        await Product.updateMany(
          {collections: params.collectionId},
          {$pull: {collections: params.collectionId}}
        )

        return new NextResponse('Collection is deleted', {status: 200});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", {status:500});
    }
}