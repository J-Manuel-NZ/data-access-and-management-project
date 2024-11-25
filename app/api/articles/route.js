import connectDB from "@/lib/mongoose";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { name, body, category, date } = await request.json();
        const newArticle = new Article({ name, body, category, date });
        await newArticle.save();
        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Article not created" }, { status: 500 });
}

export async function GET() {
    try {
        await connectDB();
        const articles = await Article.find();
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Articles not found" }, { status: 500 });
}

