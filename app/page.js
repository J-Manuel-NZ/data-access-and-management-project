'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { get, set } from "mongoose";

export default function Home() {
  const [name, setName] = useState("Name");
  const [body, setBody] = useState("Body");
  const [category, setCategory] = useState("Category");
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    const date = Date.now();
    e.preventDefault();
    try {
      const response = await axios.post("/api/articles", {
        name,
        body,
        category,
        date
      });
      if (response.status === 201) {
        console.log("Article Created");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchArticles = async () => {
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


  useEffect(() => {
    fetchArticles()
  }, []);


  return (
    <div className={styles.page}>
      <h1>Create Article Form</h1>
      <form onSubmit={handleSubmit} className={styles.flexCol}>
        <input 
        onChange={(e) => setName(e.target.value)}
        type="text" 
        placeholder={name} 
        />
        <input 
        onChange={(e) => setBody(e.target.value)}
        type="text" 
        placeholder={body}
        />
        <input 
        onChange={(e) => setCategory(e.target.value)}
        type="text" 
        placeholder={category} 
        />
        <button type="submit" >Create</button>
      </form>

      <div>
        {articles.map((article, indx) => 
          <div key={indx} className={styles.article}>
            <h2>{article.name}</h2>
            <p>{article.body}</p>
            <p>{article.category}</p>
          </div>
        )}
      </div>

    </div>
  );
}
