import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './style.scss';
import Url from "../Url";

function Newsdata({ currentemail }) {
  const [Dept, setDept] = useState("Not Selected");
  const [Owner,setOwner]=useState(currentemail);
  const route = useNavigate();
  const group = Dept;
  // const date = new Date().toLocaleString();

  const Approved = false;
  const Like = 0;
  const Reported = 0;
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleFileChange = (e) => setImgUrl(e.target.files[0]);

  const formSubmit = async (e) => {
    e.preventDefault();
    // if (Dept === "Not Selected") {
    //   toast.error("Not Selected Department");
    //   return;
    // }

    const formData = new FormData();
    formData.append('Group', group);
    formData.append('Owner', Owner);
    // formData.append('date', date);
    formData.append('Title', Title);
    formData.append('Content', Content);
    formData.append('imgUrl', imgUrl);
    formData.append('Like', Like);
    formData.append('Reported', Reported);
    formData.append('Approved', Approved);


    // formData.append('currentemail', currentemail);


    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${Url.newsUrl}/createNews`, formData,{
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success(`News Request Successfully Sent to ${Dept}`);
      route("/content")
    } catch (error) {
      console.error(error);
      toast.error("Error submitting news request");
    }
  };

  return (

    <div id="me" className="news-data-container">
      <Toaster/>
      <div className="heading-container">
        <button onClick={() => route("/content")} className="back-bt">&#129136;</button>
        <h1>You are Writing an Article</h1>
      </div>
      <form onSubmit={formSubmit} className="news-form">
        <label>
          Title
          <input type="text" required onChange={handleTitleChange} placeholder="Article Your Article Name" name="title" className="title-input" />
        </label>
        <label>
          Category
          <select onChange={(e) => setDept(e.target.value)} className="category-select">
          <option value="General">General</option>

            <option value="Training and Placement">Training and Placement Cell</option>
            <option value="Armed Forces and Motivation">Armed Forces and Motivation Cell</option>
            <option value="Career Development">Career Development Cell</option>
            <option value="International Relations">International Relation Cell</option>
            <option value="Admission">Admission Cell</option>
            <option value="Alumni">Alumni Cell</option>
            <option value="Research and Development">Research and Development Cell</option>
            <option value="System Support">System Support Cell</option>
            <option value="Technical Event">Technical Event Cell</option>
            <option value="Social Responsive">Social Responsive Cell</option>
            <option value="Entrepreneurship Development">Entrepreneurship Development Cell</option>
            <option value="Women Empowerment">Women Empowerment Cell</option>
          </select>
          <p className="selected-category">Selected Category: {Dept}</p>
        </label>
        <label>
          Content
          <textarea required onChange={handleContentChange} className="content-textarea" placeholder="Write Your news here!"></textarea>
        </label>
        <label>
          Media
          <input type="file" required onChange={handleFileChange} className="media-input" />
        </label>
        <button className="submit-bt" type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default Newsdata;
