"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddArticle = () => {
  const [name, setName] = useState(""); // Name of the article
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("Arts"); // Default category set to 'Arts'
  const [image, setImage] = useState();

  const resetInputFields = () => {
    console.log("Resetting input fields");
    setName("");
    setAbout("");
    setCategory("Arts");
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    const uploadResponse = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const imageUrl = uploadResponse.data.fileUrl;
    console.log("Image URL: ", imageUrl);
    try {
      const response = await axios.post("/api/articles", {
        category,
        name,
        about,
        image: imageUrl,
      });
      if (response.status === 201) {
        console.log("Article Created");
        toast.success("Article added successfully!");
        resetInputFields();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding article");
    }
  };

  return (
    <div className="flex items-center p-4">
      <div className="">
        <div className="create-article_heading flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Creating a New Article</h1>
        </div>
        <form id="" onSubmit={handleSubmit}>
          {/* Other input fields */}
          <label className="w-full text-sm mb-2">Title</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="E.g. 'Elon Musk' or 'The Basics of Quantum Computing'"
            className="w-full h-10 border border-solid border-gray-300 rounded p-2 mb-4 bg-white"
          />
          <label className="w-full text-sm mb-2">About</label>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            placeholder="Description of the article"
            className="w-full h-10 border border-solid border-gray-300 rounded p-2 mb-4 bg-white"
          />
          {/* Dropdown for categories */}
          <label className="w-full text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full h-10 border border-solid border-gray-300 rounded p-2 mb-4 bg-white"
          >
            <option value="Arts">Arts</option>
            <option value="Technology">Technology</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          <label className="w-full text-sm mb-2">Upload Image</label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            className="flex items-center p-1 w-full h-10 border border-solid border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-black text-white h-10 rounded mb-4 hover:scale-[1.01] transition-transform ease-out"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
