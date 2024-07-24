import './style.scss';
import React from "react";
import { useNavigate } from "react-router-dom";


function Tile({ newsItem }) {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${newsItem.id}`);
    console.log(id)
  };
  return (
    <div className="NewsTile" onClick={handleClick}>
      <h2 className="">{newsItem.Title}</h2>
      <p className="owner">Owner: {newsItem.Owner}</p>
      <span className="likes">Likes: {newsItem.Like}</span>
      <p className="date">Date: {newsItem.Date}</p>
      <img
        src={newsItem.imgUrl}
        alt={newsItem.title}
        className=""
      />
    </div>
  );
}

export default Tile;
{/* <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md">
                  <h2 className="text-2xl font-bold mb-2">{newsItem.Title}</h2>
                  <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
                  <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
                  <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
                  <img
                    src={newsItem.imgUrl}
                    alt={newsItem.Title}
                    className="w-full h-[28rem] object-cover mb-4 rounded-lg"
                  />
                  <p className="text-gray-800 mb-4">{newsItem.Content}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Likes: {newsItem.Like}</span>
                    <span className="text-red-600">Reports: {newsItem.Reported}</span>
                    <span className="text-blue-600">
                      Approved: {newsItem.Approved ? "Yes" : "No"}
                    </span>
                  </div>
                </div> */}