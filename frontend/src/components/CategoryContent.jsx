
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Url from "../Url";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CategoryContent({ userauth }) {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${Url.newsUrl}/categoryData`, {
        category: category,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchCategoryData();
  }, [category]);

  const handleOnClick = () => {
    navigate("/content");
  };

  if (!userauth) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-3xl font-bold text-center">{category}</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="flex justify-center mb-6">
          <button
            onClick={handleOnClick}
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
          >
            View All News
          </button>
        </div>
        <div className="p-5 max-w-[90%] overflow-y-auto">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md w-[60vw]">
                <h2 className="text-2xl font-bold mb-2">
                  <Skeleton width={`80%`} height={30} />
                </h2>
                <p className="text-gray-600 mb-2"><Skeleton width={`60%`} height={20} /></p>
                <p className="text-gray-600 mb-2"><Skeleton width={`50%`} height={20} /></p>
                <p className="text-gray-600 mb-2"><Skeleton width={`40%`} height={20} /></p>
                <Skeleton height={300} className="mb-4 rounded-lg" />
                <p className="text-gray-800 mb-4"><Skeleton count={3} height={20} /></p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600"><Skeleton width={50} height={20} /></span>
                  <span className="text-red-600"><Skeleton width={50} height={20} /></span>
                  <span className="text-blue-600"><Skeleton width={50} height={20} /></span>
                </div>
              </div>
            ))
          ) : data.length > 0 ? (
            data.map((newsItem, index) => (
              <div
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                key={index}
              >
                <h2 className="text-2xl font-bold mb-2">{newsItem.Title}</h2>
                <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
                <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
                <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
                {newsItem.imgUrl && (
                  <img
                    src={newsItem.imgUrl}
                    alt={newsItem.Title}
                    className="w-full h-96 object-cover mb-4 rounded-lg"
                  />
                )}
                <p className="text-gray-800 mb-4">{newsItem.Content}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Likes: {newsItem.Like}</span>
                  <span className="text-red-600">Reports: {newsItem.Reported}</span>
                  <span className="text-blue-600">
                    Approved: {newsItem.Approved ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No news data available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CategoryContent;