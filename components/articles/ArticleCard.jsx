import React from "react";

const ArticleCard = ({ title, category, about, thumbnail, onClick }) => {
  const truncatedAbout =
    about.length > 120 ? about.substring(0, 120) + "..." : about;
  return (
    <div
      className="flex flex-col gap-2 w-1/3 shadow-xl bg-white rounded-xl p-4 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-out"
     
      onClick={onClick}
    >
      <div className="flex gap-2 items-end">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-20 h-20 object-cover"
        />
        <div>
          <h1 className="text-3xl text-gray-600">{title}</h1>
          <p className="text-xl text-[#AAA]">{category}</p>
        </div>
      </div>
      <p className="text-xl text-[#888]">{truncatedAbout}</p>
    </div>
  );
};

export default ArticleCard;
