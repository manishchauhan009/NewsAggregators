// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Url from "../Url";
// import axios from "axios";
// import "./style.scss";
// import "../index.css";

// function CategoryContent() {
//   const { category } = useParams();
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const fetchCategoryData = async () => {
//     try {
//       const response = await axios.post(`${Url.newsUrl}/categoryData`, {
//         category: category,
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryData();
//   }, [category]);

//   const handleOnClick = () => {
//     navigate("/content");
//   };

//   return (
//     <div id="me" className="flex flex-col h-screen">
//       <p className="font-bold text-3xl mt-2 flex justify-center">
//         Current Uploaded Data
//       </p>
//       <p className="text-xl mt-10 text-center">Welcome </p>

//       <div className="h-screen flex flex-col items-center justify-center">
//         <button
//           onClick={handleOnClick}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
//         >
//           View All News
//         </button>
//         <div className="p-5 h-[500px] max-w-[1000px] overflow-y-scroll mr-4 ml-4 mb-4">
//           {data.length > 0 ? (
//             data.map((newsItem, index) => (
//               <div
//                 className="outline outline-2 mb-3 p-4 rounded-lg bg-white shadow-md"
//                 key={index}
//               >
//                 <h2 className="font-bold text-2xl mb-2">{newsItem.Title}</h2>
//                 <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
//                 <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
//                 <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
//                 <img
//                   src={newsItem.imgUrl}
//                   alt={newsItem.Title}
//                   className="w-full h-64 object-cover mb-4 rounded-lg"
//                 />
//                 <p className="text-gray-800 mb-4">{newsItem.Content}</p>
//                 <div className="flex justify-between">
//                   <span className="text-green-600">Likes: {newsItem.Like}</span>
//                   <span className="text-red-600">Reports: {newsItem.Reported}</span>
//                   <span className="text-blue-600">Approved: {newsItem.Approved ? "Yes" : "No"}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No news data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategoryContent;


//Style 2
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Url from "../Url";
import axios from "axios";

function CategoryContent() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    try {
      const response = await axios.post(`${Url.newsUrl}/categoryData`, {
        category: category,
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  const handleOnClick = () => {
    navigate("/content");
  };

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
        <div className="">
          {data.length > 0 ? (
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


// Style 3
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Url from "../Url";
// import axios from "axios";

// function CategoryContent() {
//   const { category } = useParams();
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const fetchCategoryData = async () => {
//     try {
//       const response = await axios.post(`${Url.newsUrl}/categoryData`, {
//         category: category,
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryData();
//   }, [category]);

//   const handleOnClick = () => {
//     navigate("/content");
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-100">
//       <header className="bg-white shadow p-4">
//         <h1 className="text-3xl font-bold text-center">Category: {category}</h1>
//       </header>
//       <main className="flex-grow p-4 overflow-y-auto">
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={handleOnClick}
//             className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
//           >
//             View All News
//           </button>
//         </div>
//         <div className="space-y-6">
//           {data.length > 0 ? (
//             data.map((newsItem, index) => (
//               <div
//                 className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
//                 key={index}
//               >
//                 <h2 className="text-2xl font-bold mb-2">{newsItem.Title}</h2>
//                 <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
//                 <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
//                 <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
//                 {newsItem.imgUrl && (
//                   <img
//                     src={newsItem.imgUrl}
//                     alt={newsItem.Title}
//                     className="w-full h-64 object-cover mb-4 rounded-lg"
//                   />
//                 )}
//                 <p className="text-gray-800 mb-4">{newsItem.Content}</p>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-green-600">Likes: {newsItem.Like}</span>
//                   <span className="text-red-600">Reports: {newsItem.Reported}</span>
//                   <span className="text-blue-600">
//                     Approved: {newsItem.Approved ? "Yes" : "No"}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No news data available.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CategoryContent;
