import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Url from "../Url";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Content({ currentuser, currentemail, userauth }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${Url.newsUrl}/newsData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userauth) {
      // getData();
    }
  }, [userauth]);

  if (!userauth) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex flex-col h-auto bg-gray-100">
      <div>
        <div className="p-4">
          <p className="text-xl mt-2 text-center">Welcome {currentemail}</p>
        </div>
        <div className="flex flex-col items-center justify-end flex-grow w-full">
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
                <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md">
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
              ))
            ) : (
              <p className="text-center text-gray-600">No news data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;


//     <div className="flex flex-col h-auto bg-gray-100">
//       <div>
//         {loading ? (
//           <Spinner />
//         ) : (
//           <div>
//             <div className="p-4">
//               <p className="text-xl mt-2 text-center">Welcome {currentemail}</p>
//             </div>
//             <div className="flex flex-col items-center justify-end flex-grow w-full">
//               <button
//                 onClick={() => {
//                   navigate("/newsdata");
//                   window.scrollTo(0, 0);
//                 }}
//                 className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-2"
//               >
//                 Request to Upload New Post
//               </button>

//               <div className="p-5 max-w-[90%] overflow-y-auto">
//                 {data.length > 0 ? (
//                   data.map((newsItem, index) => (
//                     <div
//                       key={index}
//                       className="mb-6 p-4 rounded-lg bg-white shadow-md"
//                     >
//                       <h2 className="text-2xl font-bold mb-2">
//                         {newsItem.Title}
//                       </h2>
//                       <p className="text-gray-600 mb-2">Owner: {newsItem.Owner}</p>
//                       <p className="text-gray-600 mb-2">Group: {newsItem.Group}</p>
//                       <p className="text-gray-600 mb-2">Date: {newsItem.Date}</p>
//                       <img
//                         src={newsItem.imgUrl}
//                         alt={newsItem.Title}
//                         className="w-full h-[28rem] object-cover mb-4 rounded-lg"
//                       />
//                       <p className="text-gray-800 mb-4">{newsItem.Content}</p>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-green-600">Likes: {newsItem.Like}</span>
//                         <span className="text-red-600">Reports: {newsItem.Reported}</span>
//                         <span className="text-blue-600">
//                           Approved: {newsItem.Approved ? "Yes" : "No"}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-600">No news data available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Content;
