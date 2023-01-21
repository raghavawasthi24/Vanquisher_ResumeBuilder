import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "./Login.css";
import HashLoader from "react-spinners/HashLoader";

export let profile_data={
    id:"",
    name:"",
    email:"",
    mobile_no:"",
    age:"",
}

const Login = () => {
    const initialvalues={
        mobile_number:"",
        password:""
    }
    const navigate=useNavigate();
    const [formvalues,setformvalues]=useState(initialvalues);
    const [formerror,setformerror]=useState({});
    const [noerror,setnoerror]=useState(false);
    const[iscredentials,setIscredentials]=useState(false);
    const [submitcall,setSubmitcall]=useState(false);
    const [loading,setLoading]=useState(false);

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    const error=()=>{
        const errors={}
        setnoerror(true);
        const cmobile_num= /^[7-9]([0-9]){9}$/;

        if(cmobile_num.test(formvalues.mobile_number)){
            errors.mobile_number="";
        }
        else{
            setnoerror(false)
            errors.mobile_number="**Invalid Mobile Number";
        }

        if(formvalues.password==""){
            errors.password="**This field is required"
            setnoerror(false)
        }
        else{
            errors.password="";
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
            axios.post("https://web-production-0189.up.railway.app/accounts/login/",{
                mobile_number:formvalues.mobile_number,
                password:formvalues.password
            }).then((res)=>{
                console.log(res)
                profile_data.id=res.data.profile_data.id;
                profile_data.name=res.data.profile_data.full_name;
                profile_data.age=res.data.profile_data.age;
                profile_data.mobile_no=res.data.profile_data.mobile_number;
                profile_data.email=res.data.profile_data.email;
                console.log(profile_data);
                localStorage.setItem("login","active");
                localStorage.setItem("profile_id",profile_data.id);
                localStorage.setItem("profile_name",profile_data.name);
                setLoading(false);
                navigate("/selectTemplate");
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
                setIscredentials(true);
                setTimeout(()=>{
                    setIscredentials(false);
                },3000)
            })
            // console.log(formvalues);
        }
    },[submitcall])

    const userRegister=()=>{
        navigate("/register");
        localStorage.setItem("register","active");
    }

    return(
        <>
        <div className={loading?"loading":"hide"}>
      <HashLoader
          color={'#4054B2'}
          loading={loading}
          size={50}
        />
    </div>

    <div className={loading?'hide':'login'}>
        
        <div class="loginControls">
        {/* <h1>CarGo.</h1> */}
            <form onSubmit={submitHandler} className="loginPage">
                <input type="text" name="mobile_number" value={formvalues.mobile_number} placeholder="Mobile Number" onChange={userHandler}/>
                <p className='loginerror'>{formerror.mobile_number}</p>
                <input type="password" name="password" value={formvalues.password} placeholder="Password" onChange={userHandler}/>
                <p className='loginerror'>{formerror.password}</p>
                <input type="submit" value="LogIn" className='logInsubmit'/>
            </form>
            <NavLink to="/forgetPassword" className="forgetPassword">Forgotten Password?</NavLink>
            <h4>Not Have An Account?</h4>
            
            <button  className="register" onClick={userRegister}>Register</button>
            
        </div>
        <div className={iscredentials?"successfulLogin":"hide"}>
       <p>Invalid Mobile Number or Password</p>
    </div>
    </div>
    </>
  )
}

export default Login