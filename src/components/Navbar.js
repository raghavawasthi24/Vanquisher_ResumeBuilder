import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Text } from '@chakra-ui/react';
import "./Navbar.css";
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    const moveLog=()=>{
        navigate("/logIn")
    }
    const moveSignUp=()=>{
        navigate("/register");
    }
    const movelogout=()=>{
        localStorage.removeItem("login");
        window.location.reload()
    }
    const movetoOffer=()=>{
        navigate("/offer");
    }
  return (
    <div className='navbar'>
        <div className={localStorage.getItem("login")?"hide":'loginpage'}>
            <p onClick={moveLog}>LogIn</p>
            {/* <Button colorScheme={'purple'} my={3} onClick={moveSignUp}>SignUp</Button> */}
            <Button onClick={moveSignUp} className="nav-btns">SignUp</Button>
        </div>
        <div className={localStorage.getItem("login")?'logout':'hide'}>
        {/* <Button colorScheme={'purple'} my={3} onClick={movelogout}>LogOut</Button> */}
        <Button onClick={movelogout} className="nav-btns">LogOut</Button>
        <Button className="nav-btn" onClick={movetoOffer}>Offer Job</Button>
        </div>
        
    </div>
  )
}

export default Navbar