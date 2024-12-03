'use client';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import UpdateArticle from "@/components/form/UpdateArticle";

export default function Home() {
  
  const { data: session, status } = useSession();
  console.log("Session", session);
  const [articles, setArticles] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [targetArticle, setTargetArticle] = useState({});

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

  const openUpdateModal = (article) => {
    console.log("Update Modal");
    setTargetArticle(article)
    setShowUpdateModal(true);
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/articles",{data: { 
        id 
    }});
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        fetchArticles();
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
            {
              session && session.user && session.user.role === "Tutor" 
              || session && session.user && session.user.role === "Admin" 
              ? <button onClick={() => openUpdateModal(article)}>Update</button> 
              : null
              }
            {session && session.user && session.user.role === "Admin" ? <button onClick={() => handleDelete(article._id)}>Delete</button> : null}
          </div>
        )}
      </div>
      { showUpdateModal ? <UpdateArticle setShowModal={setShowUpdateModal} article={targetArticle} fetchArticles={fetchArticles}/> : null }   

    </div>
  );
}
