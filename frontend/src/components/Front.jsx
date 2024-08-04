import React, { useEffect,useState } from 'react'
import axios from "axios";
import Tile from "./Tile";
import Url from "../Url";
import { useNavigate} from "react-router-dom";
import "./style.scss";
import sticker from "../assets/sticker.svg";
const RegisterBlock=()=>{
  let loading=false;
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`${Url.newsUrl}/approvednewsdata`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
    }
  };
  useEffect(()=>{
    getData();
  },[])
  useEffect(()=>{
    if (data.length>0){
      console.log(data)

    }
    

  },[data])
  let history=useNavigate();
    const Loginclick=()=>{
        history('/signin')
    }
  
  return(
    <div className="RegisterBlock">
      <div className='flex flex-col'>
      <div className="NewsTile-container">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-6 p-4 rounded-lg bg-white shadow-md">
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((newsItem, index) => (
                <Tile key={index} newsItem={newsItem}/>
              ))
            ) : (
              <p className="text-center text-gray-600">No news data available.</p>
            )}
          </div> 
      <div className='flex flex-row'>
      <div>
        <h1>Make Headlines: Join & Write!</h1>
        <p className='small-content'>We are always open to take you in</p>
        <p className='quote'>Transform campus conversations. Write your truth, share widely, and lead change at your university</p>
      </div>
      <button onClick={Loginclick}>
        <img src={sticker}/>
        Register NOWWW!!
      </button>
      </div>
      

      </div>
      
      

    </div>
  )
}
function Front() {

  return (
    <div className='Front'>
      <RegisterBlock/>
  </div>
  )
}

export default Front