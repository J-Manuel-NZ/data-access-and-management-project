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

export async function PUT(request) {
    try {
        // connect to db
        await connectDB();
        // get data from request
        const { 
            id,
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
        // update new article
        const updatedArticle = await Article.findByIdAndUpdate(id, { 
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

        // return response to user
        return NextResponse.json(updatedArticle, { status: 201 });
        
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Article not updated" }, { status: 500 });
}


export async function GET(request, { params }) {
    // Get article by category
    try {
        // connect to db
        await connectDB();
        // get category from the query parameters
        // get category from the URL parameters
        const { category } = params;
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



export async function DELETE(request) {
    try {
        // connect to the db
        await connectDB();
        // get the id from the request
        const { id } = await request.json();
        // find the article by id and delete it
        const deletedArticle = await Article.findByIdAndDelete(id);
        // return response to user
        return NextResponse.json(deletedArticle, { status: 200 });

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Article not deleted" }, { status: 500 });
}

