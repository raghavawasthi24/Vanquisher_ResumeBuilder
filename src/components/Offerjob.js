import React, { useState } from 'react'
import axios from 'axios' ;
import "./offer.css"
import offerimg from "../images/offerimg.png";

const Offerjob = () => {
    const [cmpname,setcmpname]=useState("")
    const [emptype,setemptype]=useState("")
    const [jobdescription,setjobdescription]=useState("")
    const [jobemail,setjobemail]=useState("")
  
    
   
    const postjob = (e) => {
        e.preventDefault()
        var x= Number( localStorage.getItem("profile_id") )
        axios.post(`https://web-production-5470.up.railway.app/info_details/company_user/${x}/${emptype}`,{user: x , company_name: cmpname ,employment_type: emptype ,description:jobdescription , email:jobemail}).then(response => console.log(response)).error( error => console.log(error))
    }
    
  return (
    <div className='offer'>
    <div className='offer-card' >
    <div className='offer-head'>OFFER JOB</div>
    <div className='label'>Company Name</div>
    <input className='offer-input' type='text' placeholder='Company Name' onChange={(e) => setcmpname(e.target.value)} />
    <div className='label' >Employment Type</div>
    <input className='offer-input' type='text' placeholder='Employment Type'onChange={(e) => setemptype(e.target.value)} />
    <div className='label'>Job Descreption</div>
    <input className='offer-input' type='text' placeholder='Description' onChange={(e) => setjobdescription(e.target.value)} />
    <div className='label'>Email</div>
    <input className='offer-input' type='email' placeholder='Email' onChange={(e) => setjobemail(e.target.value)} />
    <button className='post' onClick={postjob}>OFFER JOB</button>
    </div>
    <div className='offer-img'>
        <img className='offerimg' src={offerimg} alt="" />
    </div>
    </div>
  )
}

export default Offerjob;