'use client';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  
  const [articles, setArticles] = useState([]);

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
    console.log(articles);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.articleContainer}>
        {articles.map((article, indx) => 
          <div key={indx} className={styles.article}>
            <h2>Name: {article.name}</h2>
            <p>Type: {article.type}</p>
            <p>Category: {article.category}</p>
          </div>
        )}
      </div>

    </div>
  );
}
