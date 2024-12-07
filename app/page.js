'use client';
import styles from "./page.module.css";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import UpdateArticle from "@/components/form/UpdateArticle";
import Navbar from "@/components/navbar/Navbar";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticleModal from "@/components/articles/ArticleModal";
import { set } from "mongoose";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState({});
  const [isActiveArticleOpen, setIsActiveArticleOpen] = useState(false);
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

  const fetchArticlesBySearch = async () => {
    try {
      const response = await axios.get(`/api/articles/search/${searchQuery}`);
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveCategory('Search');
    fetchArticlesBySearch();
  }

  useEffect(() => {
    console.log("Triggered");
    if (activeCategory === 'All') {
      fetchAllArticles();
    } else if (activeCategory === 'Search') {
      return
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
      <div className="flex items-start flex-col gap-4">

        <h1 className="text-3xl text-black">SEARCH ARTICLES</h1>
        {/* Searchbar */}
        <div className="flex">
          <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="E.g. 'Elon Musk'"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-solid border-black bg-white px-2 py-3 w-96 text-gray-900 text-xl target:rounded-none active:rounded-none"
              />
            <button type='submit' className="border-2 border-solid border-black bg-black h-full text-xl px-4 py-3 ml-2 hover:opacity-90 text-white">Search</button>
          </form>
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
          <div className="flex flex-col gap-4 mt-12 items-center">

            {articles.length > 0 ? articles.map((article, indx) => (
              <ArticleCard
                key={indx}
                title={article.name}
                category={article.category}
                about={article.about}
                thumbnail={article.thumbnail}
                onClick={() => {setActiveArticle(article); setIsActiveArticleOpen(true)}}
              />
            ))
          : <h2 className="text-2xl text-black">No articles found.</h2>} 

          </div>
        {/* Article Modal */}
        {isActiveArticleOpen ? <ArticleModal article={activeArticle} closeModal={() => setIsActiveArticleOpen(false)} /> : null }
    </main>
  );
}