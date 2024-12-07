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
        const { searchQuery } = await params;
        console.log("Search Query:", searchQuery);
    
        // find all articles by search query
        const articles = await Article.find({
            $or: [ 
                { title: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } },
                { about: { $regex: searchQuery, $options: 'i' } },
            ]
        });
        // return response to user
        return NextResponse.json(articles, { status: 200 });

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Articles not found" }, { status: 404 });
}

