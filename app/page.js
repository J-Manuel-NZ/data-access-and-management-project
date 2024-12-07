'use client';
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import UpdateArticle from "@/components/form/UpdateArticle";
import Navbar from "@/components/navbar/Navbar";
import ArticleCard from "@/components/articles/ArticleCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const categories = ['All', 'Arts', 'Mathematics', 'Technology'];

  const fetchAllArticles = async () => {
    try {
      const response = await axios.get("/api/articles");
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const fetchArticlesByCategory = async (category) => {
    try {
      const response = await axios.get(`/api/articles/${category}`);
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeCategory === 'All') {
      fetchAllArticles();
    } else {
      fetchArticlesByCategory(activeCategory);
    }
  }, [activeCategory]);
  
  
  useEffect(() => {
    setActiveCategory('All');
  }, []);

  return (
    <main>
      <Navbar />
      {/* Search bar with category selection underneath */}

      {/* Articles */}
      <div className="flex items-center flex-col gap-20 mt-20 scroll-auto ">
      <div className="flex items-center flex-col gap-4">

        <h1 className="text-3xl text-black">SEARCH ARTICLES</h1>
        {/* Searchbar */}
        <div className="flex">
          <input
            type="text"
            placeholder="E.g. 'Elon Musk'"
            className="border-2 border-solid border-black bg-white px-2 py-3 w-96 text-gray-900 text-xl target:rounded-none active:rounded-none"
            />
          <button className="border-2 border-solid border-black bg-black h-full text-xl px-4 py-3 ml-2 hover:opacity-90 text-white">Search</button>
        </div>
            </div>

        {/* Category selection */}
        <div className="flex gap-4 mt-4">
          {categories.map((category, indx) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-2xl font-medium px-4 py-2 ${
                activeCategory === category ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
        {/* Scrollable Article Container */}
          <div className="flex flex-col gap-4 mt-4 items-center">
            {articles.map((article, indx) => (
              <ArticleCard
                key={indx}
                title={article.name}
                category={article.category}
                about={article.about}
                thumbnail={article.thumbnail}
              />
            ))}

          </div>
    </main>
  );
}