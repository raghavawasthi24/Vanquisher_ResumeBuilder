import React from 'react';
// import {useNavigate} from "react-router-dom";
import "./Home.css";
import FAQs from './FAQ';
import Footer from './Footer';
import homeimg from "../images/homeimg.svg";
import Navbar from './Navbar';
import { Navigate,useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate =  useNavigate()
  // const templatenavigate =()=>{
  //   navigate("/selectResume")
  const movetoTemplates=()=>{
     navigate("/selectTemplate")
  }
  // }
  return (
    <>
    <Navbar/>
    <div className='Home'>
    <div className='home-left'>
    <div className='Home-head'>Careersome</div>
    <div className='Home-subhead'>Online Resume Builder</div>
    <div className='Home-content'>Coversome is a tool that often constitutes an automated process in which you follow a template and input your information. Ability to build, print, and download your resume for free in minutes.</div>
    <button className='homebtn' onClick={movetoTemplates}>Select Template</button>
    </div>
    <img  className="homeing" src={homeimg} alt=" " />
    
    </div>
    <div className='home-design'>
</div>
 <FAQs/>
  <Footer/>
    
    </>
  )
}

export default Home;
