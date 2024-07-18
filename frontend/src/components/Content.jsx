import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Url from "../Url";

function Content({ currentuser, currentemail }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${Url.newsUrl}/newsData`, {},{
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col h-auto bg-gray-100">
      <div className="p-4">
        {/* <h1 className="text-3xl font-bold text-center">{currentuser} Current Uploaded Data</h1> */}
        <p className="text-xl mt-2 text-center">Welcome {currentemail}</p>
      </div>
      <div className="flex flex-col items-center justify-end flex-grow w-[100]">

        <button
          onClick={() => {
            navigate("/newsdata");
            window.scrollTo(0, 0);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Request to Upload New Post
        </button>

        <div className="p-5 max-w-[90%] overflow-y-auto">
          {data.length > 0 ? (
            data.map((newsItem, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg bg-white shadow-md"
              >
                <h2 className="text-2xl font-bold mb-2">{newsItem.Title}</h2>
                <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
                <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
                <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
                <img
                  src={newsItem.imgUrl}
                  alt={newsItem.Title}
                  className="w-[100%] h-[28rem] object-cover mb-4 rounded-lg"
                />
                <p className="text-gray-800 mb-4">{newsItem.Content}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Likes: {newsItem.Like}</span>
                  <span className="text-red-600">Reports: {newsItem.Reported}</span>
                  <span className="text-blue-600">Approved: {newsItem.Approved ? "Yes" : "No"}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No news data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;
