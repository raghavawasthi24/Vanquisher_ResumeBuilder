import React from 'react';
import "./Register.css";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate,NavLink } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import main from "../images/main.png";

// import { Navigate } from 'react-router-dom';

const Register = () => {
    // useEffect(()=>{
    //   if(!localStorage.getItem("register")){
    //     navigate("/")
    //   }
    // })
    const initialvalues={
        full_name:"",
        mobile_number:"",
        email:"",
        gender:"",
        age:"",
        password:"",
        password2:"",
    }
    const [formvalues,setformvalues]=useState(initialvalues);
    const [formerror,setformerror]=useState({});
    const [noerror,setnoerror]=useState(false);
    const [isRegisterConfirm,setisRegisterConfirm]=useState(false);
    const navigate=useNavigate();
    const [submitcall,setSubmitcall]=useState(false);
    const [loading,setLoading]=useState(false);

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    const error=()=>{
        const errors={}
        setnoerror(true);

        const cname=/^[a-zA-Z\.\'\-]{3,50}(?: [a-zA-Z\.\'\-]{3,50})+$/;
        const cmobile_num= /^[7-9]([0-9]){9}$/;
        const cemail=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        const cage=/^[1-9]([0-9]){1}$/;
        const password=/^[a-zA-z0-9*#_$]{5,20}$/

        if(formvalues.full_name==""){
            errors.full_name="**This field can't be empty";
            setnoerror(false);
        }
        else if(cname.test(formvalues.full_name)){
            errors.full_name=""
        }
        else{
            errors.full_name="**Invalid name";
            setnoerror(false);
            
        }

        if(cmobile_num.test(formvalues.mobile_number)){
            errors.mobile_number="";
        }
        else{
            setnoerror(false);
            errors.mobile_number="Invalid Mobile Number"
        }

        if(cemail.test(formvalues.email)){
            errors.email="";
        }
        else{
            setnoerror(false)
            errors.email="**Invalid Email Address";
        }

        // if(cemail.test(formvalues.alternate_email)){
        //     errors.alternate_email="";
        // }
        // else{
        //     setnoerror(false)
        //     errors.alternate_email="**Invalid Email Address";
        // }

        if(!cage.test(formvalues.age)){
            setnoerror(false);
            errors.age="**Enter your Age";
        }
        else{
            errors.age="";
        }

        if(formvalues.gender==""){
            setnoerror(false);
            errors.gender="**This field is required"
        }
        else{
            errors.gender="";
        }


        if(formvalues.password==""){
            errors.password="**This field is required"
            setnoerror(false)
        }
        else{
            errors.password="";
        }

        if(formvalues.password2=="")
        {
            setnoerror(false);
            errors.password2="**Enter Confirm Password"
        }
        else if(formvalues.password!=formvalues.password2){
            setnoerror(false);
            errors.password2="**Password Not Mastched"
        }
        else{
            errors.password2="";
        }

        return errors;
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setformerror(error());
        if(submitcall==false){
            setSubmitcall(true);
            }
            else{
                setSubmitcall(false);
            }
        
    }

    useEffect(()=>{
        if(noerror==true){
            setLoading(true);
            axios.post("https://web-production-5470.up.railway.app/accounts/register/",{
                full_name:formvalues.full_name,
                email:formvalues.email,
                mobile_number:formvalues.mobile_number,
                gender:formvalues.gender,
                age:formvalues.age,
                password:formvalues.password,
                password2:formvalues.password2,
            }).then((res)=>{
                console.log(res)
                setisRegisterConfirm(true);
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            })
            console.log(formvalues);
        }
    },[submitcall])

    const userlogin=()=>{
        navigate("/login");
        localStorage.removeItem("register");
    }

  return (
    <>
    <div className={loading?"loading":"hide"}>
      <HashLoader
          color={'#4054B2'}
          loading={loading}
          size={50}
        />
    </div>
    <div className={loading?'hide':'registerUser'}>
      
      <div className='registerControl'>
      {/* <h1>CarGo.</h1> */}
      <img src={main} className="loginLogo"/>
        <form onSubmit={submitHandler} className="registerPage">
            <input type="text" name="full_name" value={formvalues.full_name} placeholder="Full Name" className="inputfield" onChange={userHandler}/>
            <p className='registererror'>{formerror.full_name}</p>
            <input type="text" name="mobile_number" value={formvalues.mobile_number} placeholder="Mobile Number" className="inputfield" onChange={userHandler}/>
            <p className='registererror'>{formerror.mobile_number}</p>
            <input type="text" name="email" value={formvalues.email} placeholder="Email Address" onChange={userHandler} className="inputfield"/>
            <p className='registererror'>{formerror.email}</p>
            {/* <input type="text" name="alternate_email" value={formvalues.alternate_email} placeholder="Alternative Email Address" onChange={userHandler} className="inputfield"/>
            <p className='registererror'>{formerror.alternate_email}</p> */}
            <label id="gender">Gender</label>
            <div className="genderControl">
                <div className="genderCategory">
                    <input type="radio" name="gender" value="Male" onChange={userHandler}/>
                    <label>Male</label><br/>
                </div>
                <div className="genderCategory">
                    <input type="radio" name="gender" value="Female" onChange={userHandler}/>
                    <label>Female</label><br/>
                </div>
                <div className="genderCategory">
                    <input type="radio" name="gender" value="Custom" onChange={userHandler}/>
                    <label>Custom</label><br/>
                </div>
            </div>
            <p className='registererror'>{formerror.gender}</p>
            <input type="text" name="age" value={formvalues.age} placeholder="Age" onChange={userHandler} className="inputfield"/>
            <p className='registererror'>{formerror.age}</p>
            <input type="password" name="password" value={formvalues.password} placeholder="Password" onChange={userHandler} className="inputfield"/>
            <p className='registererror'>{formerror.password}</p>
            <input type="password" name="password2" value={formvalues.password2} placeholder="Confirm Password" onChange={userHandler} className="inputfield"/>
            <p className='registererror'>{formerror.password2}</p>

            <input type="submit" value="Register" className="inputfield registerbtn"/>
        </form>
        <h4>Already Have An Account?</h4>
            
         <button  className="loginback" onClick={userlogin}>LogIn</button>
      </div>
      <div className={isRegisterConfirm?"confirmRegister":"hide"}>
        <div class="register-confirm">
            <p>Verification Email Link is sent to your Registered Email Address.</p>
            <p>Click on the link and verify your account.</p>
            <button onClick={userlogin}>Back To LogIn</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register
