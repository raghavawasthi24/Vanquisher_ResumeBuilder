import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useResume } from "../../Context";
import ImageUpload from "../ImageUploadButton/ImageUpload.component";

const About = () => {
  const { aboutList, setAboutList } = useResume();

    const addMore = () => {
        setAboutList([...aboutList, aboutList]);
    }
  const { about, setAbout } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const save=()=>{
    axios.post(`https://web-production-5470.up.railway.app/info_details/about/${localStorage.getItem("profile_id")}`,{
      
      
        full_name: about.name,
        role: about.role,
        email: about.email,
        mobile_number: about.phone,
        address: about.address,
        linkedin: about.linkedin,
        user: localStorage.getItem("profile_id"),
    
        
      
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
      {/* <Stack spacing={4} mb={2}>
        {about.picture ? (
          <Button
            onClick={() => {
              setAbout({ ...about, picture: "" });
            }}
            colorScheme="red"
            variant="outline"
          >
            Remove Image
          </Button>
        ) : (
          <ImageUpload />
        )} */}

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="name"
              id="name"
              type="text"
              variant="filled"
              placeholder="Full Name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="role"
              id="role"
              type="text"
              variant="filled"
              placeholder="Role"
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="email"
              id="email"
              type="email"
              variant="filled"
              placeholder="Email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="phone"
              id="phone"
              type="tel"
              variant="filled"
              placeholder="Phone"
            />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="address"
              id="address"
              type="text"
              variant="filled"
              placeholder="Address"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="linkedin"
              id="linkedin"
              type="url"
              variant="filled"
              placeholder="https://linkedin.com"
            />
          </FormControl>
          
        </HStack>
        <Button colorScheme={'purple'} my={5} onClick={save}>Save</Button>
      {/* </Stack> */}
    
    </>
  );
};

export default About;
