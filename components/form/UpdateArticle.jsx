import React, { useState } from "react";
import axios from "axios";
import "./createArticle.css";
import { toast } from "react-toastify";

function UpdateArticle({ setShowModal, article, fetchArticles }) {
  console.log("article: ", article);
  const [id, setId] = useState(article._id || "");
  const [category, setCategory] = useState(article.category || "");
  const [name, setName] = useState(article.name || "");
  const [about, setAbout] = useState(article.about || "");
  const [image, setImage] = useState(article.image || "");

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
      const response = await axios.put("/api/articles", {
        id,
        category,
        name,
        about,
        image: imageUrl,
      });
      if (response.status === 201) {
        console.log("Article Updated");
        setShowModal(false);
        fetchArticles();
        toast.success(article.name + " updated!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating article");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Update Article Form</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          {/* Other input fields */}
          <label className="w-full text-sm mb-2">Title</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="E.g. 'Elon Musk' or 'The Basics of Quantum Computing'"
            className="w-full h-10 border border-gray-300 rounded p-2 mb-4 bg-white"
          />
          <label className="w-full text-sm mb-2">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            placeholder="Description of the article"
            className="w-full h-40 border border-gray-300 rounded p-2 mb-4 bg-white"
          />
          {/* Dropdown for categories */}
          <label className="w-full text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full h-10 border border-gray-300 rounded p-2 mb-4 bg-white"
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
            className="flex items-center p-1 w-full h-10 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-black text-white h-10 rounded mb-2 hover:scale-[1.01] transition-transform ease-out"
          >
            Save
          </button>
          <button
          onClick={() => setShowModal(false)}
            className="w-full bg-gray-300 text-black h-10 rounded mb-4 hover:scale-[1.01] transition-transform ease-out"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateArticle;
