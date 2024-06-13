import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();
        const {username, password} = await req.json();
        const user = await User.create({username, password});
        await user.save();
        return NextResponse.json(user, {status: 200});
    } catch (error) {
        console.log(error);        
        return new NextResponse(`Internal Error: ${error}`, {status: 500})
    }
}