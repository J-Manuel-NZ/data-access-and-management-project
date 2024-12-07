'use client'
import React, { useEffect, useState } from 'react'
import ArticleCardEditable from '@/components/articles/ArticleCardEditable'
import { useSession } from 'next-auth/react'
import UpdateArticle from '@/components/form/UpdateArticle'
import axios from 'axios'

const EditArticles = () => {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState({})
  const [showEditModal, setShowEditModal] = useState(false);
  const {data: session} = useSession();
  const userRole = session.user.role;
  console.log("userRole" ,userRole);

  const fetchAllArticles = async () => {
    console.log('Fetching all articles')
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
    fetchAllArticles();
  }, [])

  if (articles.length === 0) {
    return (
      <div>
        <h1 className='text-2xl font-bold'>No articles found</h1>
        <button onClick={fetchAllArticles}>Refresh</button>
      </div>

    )
  }


  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Edit Articles</h1>
      <div className='flex flex-col w-full '>
        {articles.map(article => <ArticleCardEditable article={article} setArticle={setArticle} key={article._id} userRole={userRole} setShowEditModal={setShowEditModal} />)}
      </div>
      {showEditModal && <UpdateArticle fetchArticles={fetchAllArticles} article={article} setShowModal={setShowEditModal}  />}
    </div>
  )
}

export default EditArticles