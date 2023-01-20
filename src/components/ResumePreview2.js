import {
    Box,
    Heading,
    HStack,
    Tag,
    TagLabel,
    Text,
    VStack,
    Wrap,
    UnorderedList,
    ListItem,
  } from "@chakra-ui/react";
import React from 'react';
import './ResumePreview2.css';
import { BiLinkExternal } from "react-icons/bi";
import { useResume } from "../Context";

const ResumePreview2 = () => {
    const { theme, about, educationList, skills, workList, projects, printElem } =
    useResume();
  return (
    <div className='resumePreview2'>
        
        <div class="sidebar2">
            <div className='sidebar21'>
            <Heading as="h5" size="md" color={"white.700"} marginBottom={"0.5rem"}>
                          RAGHAV AWASTHI
                        </Heading>
        <p>Front Web Developer</p>
        <hr/>
                <div class="aboutDetails2">
                    <p>Email</p>
                    <p>Phone No.</p>
                    <p>Address</p>
                    <p>LinkedIn</p>
                </div>
                <div className='skills2'>
                <Heading as="h5" size="md" color={"gray.700"}>
                          SKILLS
                        </Heading>
                    {/* <p>asdfg</p>
                    <p>asdfg</p>
                    <p>asdfg</p>
                    <p>asdfg</p>
                    <p>asdfg</p>
                    <p>asdfg</p> */}
                    {skills.map((skill, index) => (
                    <Tag
                    //   size={"md"}
                    //   borderRadius="md"
                      variant="none"
                    //   bg={theme.replace("400", "500")}
                         
                         boxShadow="none"
                         key={index}
                    >
                      <TagLabel>{skill.name}</TagLabel>
                      
                    </Tag>
                  ))}
                </div>
            </div>
            <div class="sidebar22">
            
                <div className="education2">
                <Heading as="h4" size="md" color={"gray.700"}>
                          EDUCATION
                        </Heading>
                    {educationList.map((education) => {
                          const { degree, school, startYr, endYr, grade } = education;
                          return (
                            <VStack
                              spacing={0}
                              alignItems={"flex-start"}
                              w={"full"}
                              pb={2}
                            >
                              <Text fontWeight={"medium"}>
                                {degree ? degree : "B.Tech Computer Engineering"}
                              </Text>
                              <Text fontSize={"sm"}>
                                {school ? school : "College of Engineering Pune"}
                              </Text>
                              <HStack
                                fontSize={"xs"}
                                fontStyle={"italic"}
                                justifyContent={"space-between"}
                                w={"full"}
                              >
                                <Text>
                                  {startYr ? startYr : 2014} - {endYr ? endYr : 2018}
                                </Text>
                                <Text>{grade ? grade : "8.7 CGPA"}</Text>
                              </HStack>
                            </VStack>
                          );
                        })}
                </div>
                <div className="work2">
                <Heading as="h4" size="md" color={"gray.700"}>
                          EXPERIENCE
                        </Heading>
                        <hr/>
                <VStack alignItems={"flex-start"}>
                {workList.map((work) => {
                          const {
                            position,
                            type,
                            company,
                            startDate,
                            endDate,
                            description: desc,
                          } = work;
                          return (
                            <VStack
                              spacing={0.5}
                              alignItems={"flex-start"}
                              lineHeight={1.3}
                              pb={2}
                            >
                              <Text fontWeight={"medium"}>
                                {position ? position : "Full Stack Developer"}
                              </Text>
                              <Text fontSize={"sm"}>
                                {company ? company : "XYZ Infotech Services"} -{" "}
                                {type ? type : "Full-time"}
                              </Text>
                              <Text fontSize={"xs"} fontStyle={"italic"}>
                                {startDate ? startDate : "2018-03"} -{" "}
                                {endDate ? endDate : "2021-12"}
                              </Text>
                              <Text fontSize={"sm"} as="p">
                                {desc
                                  ? desc
                                  : "Fixed bugs from existing websites and implemented enhancements that significantly improved web functionality and speed."}
                              </Text>
                            </VStack>
                          );
                        })}
                      </VStack>
                </div>
                <div className="projects">
                <VStack alignItems={"flex-start"}>
                        <Heading as="h4" size="md" color={"gray.700"}>
                          PROJECTS      
                        </Heading>
                        
                        {projects.map((project) => {
                          const { name, url, description: desc } = project;
                          return (
                            <VStack
                              spacing={0.5}
                              alignItems={"flex-start"}
                              lineHeight={1.3}
                              pb={2}
                            >
                              <HStack as="a" href={url} target="_blank" spacing={0.5}>
                                <Text fontWeight={"medium"} flex={"row"}>
                                  {name ? name : "Project Name"}{" "}
                                </Text>{" "}
                                <BiLinkExternal />
                              </HStack>
                              <UnorderedList pl={5}>
                                <ListItem>
                                  <Text fontSize={"sm"} as="p">
                                    {desc
                                      ? desc
                                      : "Lorem ipsum dolor sit amet consectetur adipisicing."}
                                  </Text>
                                </ListItem>
                              </UnorderedList>
                            </VStack>
                          );
                        })}
                      </VStack>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResumePreview2