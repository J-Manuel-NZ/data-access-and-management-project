import React, { useState, useEffect } from 'react';
import './SearchPage.css';


function SearchPage() {

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(''); 


  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:5000/api/articles');
      const data = await response.json();
      setArticles(data);
    };
    
    fetchArticles();
  }, []); 
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = articles.filter(article => {
    const titleMatch = article.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = category ? article.category === category : true;
    return titleMatch && categoryMatch;
  });

  return (
    <div className="Search-Page">
      <h1>Search Articles</h1>

      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearch} 
        placeholder="Search articles..." 
        className="search-input"
      />
      
      <select onChange={(e) => setCategory(e.target.value)} className="category-select">
        <option value="">All Categories</option>
        <option value="Arts">Arts</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Technology">Technology</option>
      </select>

      <div className="articles-list">
        {filteredArticles.map((article) => (
          <div key={article._id} className="article-card">
            <h3>{article.name}</h3>
            <p><strong>Category:</strong> {article.category}</p>
            <p>{article.about}</p>
            <p><strong>Notable Works:</strong> {article.notableWorks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage; 
