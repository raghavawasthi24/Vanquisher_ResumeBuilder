import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import main from "../images/main.png";
import love from "../images/love.png";

const Footer = () => {
  return (
    <>
      <div className="main-footer">
        
            <img className="MainName" src={main} alt="" />
            <p className="wish">Made With <img src={love}/> By Team Vanquisher</p>
            <br/>
        <hr/>
      </div>
    </>
  );
};

export default Footer;
