import connectDB from "@/lib/mongoose";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    // Get article by category
    try {
        // connect to db
        await connectDB();
        // get category from the query parameters
        // get category from the URL parameters
        const { category } = await params;
        console.log("Category:", category);
    
        // find all articles by category
        const articles = await Article.find({ category });
        // return response to user
        return NextResponse.json(articles, { status: 200 });

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Articles not found" }, { status: 404 });
}

