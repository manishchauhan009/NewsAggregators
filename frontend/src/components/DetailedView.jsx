import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../Url';

function DetailedView() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');
    const decodedObject = JSON.parse(decodeURIComponent(data));
    setLoading(false)
    setNewsItem(decodedObject)
    

  }, []);

  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>News item not found</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-6 p-4 rounded-lg bg-white shadow-md">
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
      </div>
    </div>
  );
}

export default DetailedView;
