import { set } from 'mongoose'
import React, {useState} from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const ArticleCardEditable = ({article, setShowEditModal, userRole, setArticle, fetchArticles}) => {
  const {data: session} = useSession();

  const id = article._id;

  
  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/articles",{data: { 
        id 
    }});
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        fetchArticles();
        toast.success('Deleted ' + article.name + " successfully!"); 
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting article: '+ error);
    }
  }

  return (
    <div className='grid grid-cols-6 gap-4 items-center w-full bg-white shadow-md rounded-md p-4 my-2'>
      <div className='col-span-1'>
        {article.image !== '' && <img src={article.image} alt='thumbnail' className='w-20 h-20 object-cover' />}
      </div>
      <div className='col-span-1'>
        <h3 className='text-lg font-medium'>Title</h3>
        <h3 className='text-2xl font-bold'>{article.name}</h3>
      </div>
      <div className='col-span-1'>
        <h3 className='text-lg font-medium'>Category</h3>
        <h3 className='text-2xl font-bold'>{article.category}</h3>
      </div>
      <div className='col-span-2'>
        <p className='text-sm text-gray-500'>{article.about}</p>
      </div>
      <div className='col-span-1 flex gap-5 justify-end'>
        <button
          className='bg-blue-500 text-white rounded-md p-2 hover:scale-[1.02] transition-all hover:shadow-xl '
          onClick={() => {
            setArticle(article);
            setShowEditModal(true);
          }}
        >
          Edit
        </button>
      {userRole === 'Admin' ?
        <div className=''>
          <button className='bg-red-500 text-white rounded-md p-2 hover:scale-[1.01] ' onClick={handleDelete}>Delete</button>
        </div>
        : <div className=''>
        <button className='bg-gray-300 text-white rounded-md p-2 cursor-default'>Delete</button>
      </div>}
      </div>
    </div>
  )
}

export default ArticleCardEditable