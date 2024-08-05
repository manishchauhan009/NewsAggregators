import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../Url';
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import feedback from "../assets/feedback.svg";
import report from "../assets/report.svg"
function DetailedView() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentuser,setcurrentuser]=useState(null);
  const [like1,setlike1]=useState(0);

  const liked = async () => {
    const query = new URLSearchParams(window.location.search);
    const current=query.get('auth')
    try {
      const response = await axios.post(`${Url.newsUrl}/verifylike`, {
        newsid: newsItem._id,
        currentemail:current
      });
      if (response.data===0){

      }
      else{
        setlike1(like1+1);
      }
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');
    const decodedObject = JSON.parse(decodeURIComponent(data));
    setLoading(false)
    setNewsItem(decodedObject)
    
    

  }, []);
  useEffect(()=>{
    if (newsItem!==null){
      setlike1(newsItem.Like);
    }
    console.log(newsItem,"checkitem")
  },[newsItem])
  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>News item not found</p>;

  return (
    <div className="DetailedView">
        <h1 className="">{newsItem.Title}</h1>
        <div className="little-things">
          <p className="">Author: {newsItem.Owner}</p>
          <p className="">Category: {newsItem.Group}</p>
          <p className="">{newsItem.Date}</p>
          <div className="extras">
          <span className='likes'>
          {like1}
          <img src={like} onClick={()=>{
            liked();
          }} title='like article'/>
          </span>
          <img src={share} title='share article'/>
          <a href="mailto:support@yourwebsite.com?subject=Support Inquiry&body=Hello, I need help with..."><img src={feedback} title='share feedback'/></a>
          <img src={report} title='report article'/>
        </div>
        </div>
        <div className="img-container">
          <img
            src={newsItem.imgUrl}
            alt={newsItem.Title}
            className=""
          />
        </div>
        <p className="content">{newsItem.Content}</p>
    </div>
  );
}

export default DetailedView;
