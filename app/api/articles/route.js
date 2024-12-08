import connectDB from "@/lib/mongoose";
import Article from "@/models/article";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
    try {
        // connect to db
        await connectDB();
        // get data from request
        const { 
            category,
            name,
            about,
            image
        } = await request.json();
        // create new article
        const newArticle = new Article({ 
            category,
            name,
            about,
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
            name,
            about,
            image
        } = await request.json();
        // update new article
        const updatedArticle = await Article.findByIdAndUpdate(id, { 
            category,
            name,
            about,
            image
        });

        // return response to user
        return NextResponse.json(updatedArticle, { status: 201 });
        
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Article not updated" }, { status: 500 });
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



export async function DELETE(request) {
    try {
      // Connect to the database
      await connectDB();
  
      // Get the ID from the request
      const { id } = await request.json();
  
      // Find the article by ID
      const article = await Article.findById(id);
      if (!article) {
        return NextResponse.json({ message: "Article not found" }, { status: 404 });
      }
  
      // Get the image URL from the article
      const imageUrl = article.image;
      const imagePath = path.join(process.cwd(), "public", imageUrl);
  
      // Delete the image file if it exists
      try {
        await fs.unlink(imagePath);
        console.log(`Deleted image file: ${imagePath}`);
      } catch (error) {
        console.log(`Error deleting image file: ${error.message}`);
      }
  
      // Delete the article from the database
      const deletedArticle = await Article.findByIdAndDelete(id);
  
      // Return response to user
      return NextResponse.json(deletedArticle, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Article not deleted" }, { status: 500 });
    }
  }

