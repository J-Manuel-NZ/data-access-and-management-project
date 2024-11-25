import connectDB from "@/lib/mongoose";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // connect to db
        await connectDB();
        // get data from request
        const { 
            category,
            type,
            name,
            about,
            born,
            died,
            nationality,
            knownFor,
            notableWorks,
            year,
            medium,
            dimensions,
            location,
            designedBy,
            developer,
            image
        } = await request.json();
        // create new article
        const newArticle = new Article({ 
            category,
            type,
            name,
            about,
            born,
            died,
            nationality,
            knownFor,
            notableWorks,
            year,
            medium,
            dimensions,
            location,
            designedBy,
            developer,
            image
        });
        await newArticle.save();
        // return response to user
        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.log(error);
    }
    // return error response
    return NextResponse.json({ message: "Article not created" }, { status: 500 });
}

export async function GET() {
    try {
        // connect to db
        await connectDB();
        // get all articles from db
        const articles = await Article.find();
        // return response to user to use in client
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Articles not found" }, { status: 500 });
}

