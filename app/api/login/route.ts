import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const {username, password} = await req.json();

        if(!username || !password) {
            return new NextResponse("Please provide username and password", {status: 400});
        }

        const user = await User.findOne({username, password});

        if (!user) {
            return new NextResponse("Invalid Credentials", {status: 401});
        }

        return new NextResponse("Login Successfull", {status: 200});

    } catch (error: Error | any) {
        console.log(error);
        return new NextResponse(error, {status: 500});
    }
}