import {
    Box,
    Container,
    Stack,
    Text,
    HStack,
    Heading,
    Button,
} from '@chakra-ui/react';
import React ,{useState}from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./SelectTemplate.css";

export let TemplateNo={
    temp:1,
}

const SelectTemplate = () => {   
    const [show1,setShow1]=useState(false);
    const [show2,setShow2]=useState(false)
    const navigate=useNavigate();
    const handleTemplate1=()=>{
       TemplateNo.temp=1;
       navigate("/main");
    }
    const handleTemplate2=()=>{
        TemplateNo.temp=2;
        navigate("/main");
     }

     const handlemouseEnter1=()=>{

       setShow1(true)
     }
     const handlemouseLeave1=()=>{
        setShow1(false)
     }
     const handlemouseEnter2=()=>{
        setShow2(true)
      }
      const handlemouseLeave2=()=>{
         setShow2(false)
      }
  return (
    <div className='selectTemplate'>
        <h5>Select Template</h5>
        <div className='templates'>
            <div className='template1' onMouseEnter={handlemouseEnter1} onMouseLeave={handlemouseLeave1}>
              {/* <p className={show1?"showOpt":"hide"}>Use Template</p> */}
              <Button  className={show1?"showOpt":"hide"} onClick={handleTemplate1} colorScheme={'purple'}>Use Template</Button>
            </div>
            <div className='template2' onMouseEnter={handlemouseEnter2} onMouseLeave={handlemouseLeave2}>
              {/* <p className={show2?"showOpt":"hide"}>Use Template</p> */}
              <Button  className={show2?"showOpt":"hide"} onClick={handleTemplate2} colorScheme={'purple'}>Use Template</Button>
            </div>
        </div>
       {/* <p onClick={handleTemplate1}>ghfdf</p>
        <p onClick={handleTemplate2}>ghfhjgkjhgkuerhgi</p> */}
    </div>
  )
}

export default SelectTemplate