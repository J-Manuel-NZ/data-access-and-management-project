import React, { useState } from 'react';
import axios from 'axios';
import './createArticle.css';
import { set } from 'mongoose';

function CreateArticle({ setShowModal }) {
    const [name, setName] = useState("Name");
    const [about, setAbout] = useState("About");
    const [category, setCategory] = useState("Arts"); // Default category set to 'Arts'
    const [type, setType] = useState("Type");
    const [born, setBorn] = useState("Born");
    const [died, setDied] = useState("Died");
    const [nationality, setNationality] = useState("Nationality");
    const [knownFor, setKnownFor] = useState("Known For");
    const [notableWorks, setNotableWorks] = useState("Notable Works");
    const [year, setYear] = useState("Year");
    const [medium, setMedium] = useState("Medium");
    const [dimensions, setDimensions] = useState("Dimensions");
    const [location, setLocation] = useState("Location");
    const [designedBy, setDesignedBy] = useState("Designed By");
    const [developer, setDeveloper] = useState("Developer");
    const [image, setImage] = useState("Image");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/articles", { 
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
                console.log("Article Created");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-article_modal'>
            <div className="create-article_heading">
                <h1>Create Article Form</h1>
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
                    onChange={(e) => setType(e.target.value)}
                    type="text" 
                    placeholder="Type" 
                />
                <input 
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    placeholder="Name" 
                />
                <input 
                    onChange={(e) => setAbout(e.target.value)}
                    type="text" 
                    placeholder="About" 
                />
                <input 
                    onChange={(e) => setBorn(e.target.value)}
                    type="text" 
                    placeholder="Born" 
                />
                <input 
                    onChange={(e) => setDied(e.target.value)}
                    type="text" 
                    placeholder="Died" 
                />
                <input 
                    onChange={(e) => setNationality(e.target.value)}
                    type="text" 
                    placeholder="Nationality" 
                />
                <input 
                    onChange={(e) => setKnownFor(e.target.value)}
                    type="text" 
                    placeholder="Known For" 
                />
                <input 
                    onChange={(e) => setNotableWorks(e.target.value)}
                    type="text" 
                    placeholder="Notable Works" 
                />
                <input 
                    onChange={(e) => setYear(e.target.value)}
                    type="text" 
                    placeholder="Year" 
                />
                <input 
                    onChange={(e) => setMedium(e.target.value)}
                    type="text" 
                    placeholder="Medium" 
                />
                <input 
                    onChange={(e) => setDimensions(e.target.value)}
                    type="text" 
                    placeholder="Dimensions" 
                />
                <input 
                    onChange={(e) => setLocation(e.target.value)}
                    type="text" 
                    placeholder="Location" 
                />
                <input 
                    onChange={(e) => setDesignedBy(e.target.value)}
                    type="text" 
                    placeholder="Designed By" 
                />
                <input 
                    onChange={(e) => setDeveloper(e.target.value)}
                    type="text" 
                    placeholder="Developer" 
                />
                <input 
                    onChange={(e) => setImage(e.target.value)}
                    type="text" 
                    placeholder="Image" 
                />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default CreateArticle;