import React, { useState } from 'react';
import axios from 'axios';
import './createArticle.css';
import { set } from 'mongoose';

function UpdateArticle({ setShowModal, article, fetchArticles }) {
    console.log("article: ",article)
    const [id, setId] = useState(article._id || '');
    const [category, setCategory] = useState(article.category || '');
    const [type, setType] = useState(article.type || '');
    const [name, setName] = useState(article.name || '');
    const [about, setAbout] = useState(article.about || '');
    const [born, setBorn] = useState(article.born || '');
    const [died, setDied] = useState(article.died || '');
    const [nationality, setNationality] = useState(article.nationality || '');
    const [knownFor, setKnownFor] = useState(article.knownFor || '');
    const [notableWorks, setNotableWorks] = useState(article.notableWorks || '');
    const [year, setYear] = useState(article.year || '');
    const [medium, setMedium] = useState(article.medium || '');
    const [dimensions, setDimensions] = useState(article.dimensions || '');
    const [location, setLocation] = useState(article.location || '');
    const [designedBy, setDesignedBy] = useState(article.designedBy || '');
    const [developer, setDeveloper] = useState(article.developer || '');
    const [image, setImage] = useState(article.image || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/api/articles", { 
                id,
                category,
                type,
                name,
                about,
                born,
                died,
                nationality,
                knownFor,
                notableWorks,
                year,
                medium,
                dimensions,
                location,
                designedBy,
                developer,
                image
            });
            if (response.status === 201) {
                console.log("Article Updated");
                setShowModal(false);
                fetchArticles();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-article_modal'>
            <div className="create-article_heading">
                <h1>Update Article Form</h1>
                <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
      {/* Dropdown for categories */}
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="Arts">Arts</option>
        <option value="Technology">Technology</option>
        <option value="Mathematics">Mathematics</option>
      </select>

      {/* Other input fields */}
      <input 
        value={type}
        onChange={(e) => setType(e.target.value)}
        type="text" 
        placeholder="Type" 
      />
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text" 
        placeholder="Name" 
      />
      <input 
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        type="text" 
        placeholder="About" 
      />
      <input 
        value={born}
        onChange={(e) => setBorn(e.target.value)}
        type="text" 
        placeholder="Born" 
      />
      <input 
        value={died}
        onChange={(e) => setDied(e.target.value)}
        type="text" 
        placeholder="Died" 
      />
      <input 
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        type="text" 
        placeholder="Nationality" 
      />
      <input 
        value={knownFor}
        onChange={(e) => setKnownFor(e.target.value)}
        type="text" 
        placeholder="Known For" 
      />
      <input 
        value={notableWorks}
        onChange={(e) => setNotableWorks(e.target.value)}
        type="text" 
        placeholder="Notable Works" 
      />
      <input 
        value={year}
        onChange={(e) => setYear(e.target.value)}
        type="text" 
        placeholder="Year" 
      />
      <input 
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
        type="text" 
        placeholder="Medium" 
      />
      <input 
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        type="text" 
        placeholder="Dimensions" 
      />
      <input 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        type="text" 
        placeholder="Location" 
      />
      <input 
        value={designedBy}
        onChange={(e) => setDesignedBy(e.target.value)}
        type="text" 
        placeholder="Designed By" 
      />
      <input 
        value={developer}
        onChange={(e) => setDeveloper(e.target.value)}
        type="text" 
        placeholder="Developer" 
      />
      <input 
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text" 
        placeholder="Image" 
      />
      <button type="submit">Save</button>
    </form>
        </div>
    )
}

export default UpdateArticle;