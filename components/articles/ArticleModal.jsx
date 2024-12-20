import React from 'react';

const ArticleModal = ({ article, closeModal }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-filter z-40'>
      <div className='bg-white w-1/2 max-h-full overflow-y-auto flex flex-col gap-4 p-8 rounded-xl relative'>
        <img src={article.image} alt='thumbnail' className='w-60 object-cover rounded-xl' />
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl text-gray-600'>{article.name}</h1>
          <p className='text-2xl text-[#AAA]'>{article.category}</p>
          <p className='text-2xl text-[#888]'>{article.about}</p>
        </div>
        <button className='absolute top-2 right-4 text-black' onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ArticleModal;