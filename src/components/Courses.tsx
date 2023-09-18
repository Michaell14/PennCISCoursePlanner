import courses from '../data/courses.json';
import { Box, Text, SimpleGrid, List, ListItem, ListIcon, IconButton, VStack, Center, Input, useToast } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import Nav from './Nav';
import { useQuery } from '../lib/useQuery';
import { DeleteIcon, AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {MdCheckCircle, MdLabel} from "react-icons/md";

export default function Courses(){

  const [cartClasses, setClasses] = useState<number[]>([]);
  const [infoClasses, setInfoClasses] = useState<number[]>([]);
  const [searchText, setSearch] = useState("");
  const toast = useToast();
  const query = useQuery();

  useEffect(() => {
    const q=query.get("classes")
    if (q){
      const currClasses = q.split(";");
      const toAdd = [];
      for (let i=0; i<currClasses.length; i++){
        toAdd.push(parseInt(currClasses[i]))
      }
      setClasses(toAdd);
    }
  }, [])


  function showMoreInfo(number:number, index: number){
    setInfoClasses(infoClasses => [...infoClasses, number]);
  }
  function showLessInfo(number:number, index: number){
    setInfoClasses(infoClasses.filter(item => item !== number))
  }

  function addClass(number: number){

    if (cartClasses.length>=7){
      toast({ title: "Maximum Class Capacity.",
        description: "You can have at most 7 classes in your cart!",
        status: 'warning', duration: 3000, isClosable: true, position: "top-left"
      })
    } else{
        setClasses(cartClasses => [...cartClasses, number]);
        toast({ title: "CIS " + number + " has been added to Cart",
          description: "Enjoy the class!",
          status: 'success', duration: 3000, isClosable: true, position: "top-left"
        })
    }
  }

  function removeClass(number: number){
    setClasses(cartClasses.filter(item => item !== number))
    toast({ title: "CIS " + number + " has been removed from Cart",
      description: "That class sounds hard!",
      status: 'info', duration: 3000, isClosable: true, position: "top-left"
    })
  }

  return (
  <>
    <Nav cartClasses={cartClasses} {...setClasses}/>
    <Center mt={5} mb={9} textAlign={"center"}>
      <VStack>
        <Text fontSize={50} fontWeight={"bold"}>Search for a CIS Class</Text>
          <Input
            value={searchText} onChange={(e)=>setSearch(e.target.value)}
            type={'text'}
            backgroundColor={"white"} borderColor={"black"} borderWidth={4} color={"black"} focusBorderColor='black' placeholder="Begin class searching..." 
          />
      </VStack>
    </Center>

    <SimpleGrid minChildWidth='320px' spacing='42px'>
      {(courses.map((course, index) => (((""+course["number"]).includes(searchText) || 
      (course["title"].toLowerCase().includes(searchText.toLowerCase()) || (course["description"].toLowerCase().includes(searchText.toLowerCase())))) && 
        <Box boxShadow={"lg"} position={"relative"} bg={"lightblue"} height={"fit-content"} px={5} pt={2} key={index} borderRadius={5}>
          <Text fontSize={20} fontWeight={"600"}>
            {course["dept"]}
            {' '}
            {course["number"]}
          </Text>
          <Text fontWeight={"bold"}>{course["title"]}</Text>

          {course ["prereqs"] && 
          <>
            <Text color={"blackAlpha.800"} mt={2}>Prerequisites: </Text>
            <List>
              {course["prereqs"] && course["prereqs"].map((prereq, ind) => (
                <ListItem key={ind}>
                  <ListIcon as={MdLabel} color="green.500"/>
                  {prereq}
                </ListItem>
              )) }
          </List></>}
            <Box height={infoClasses.includes(course["number"]) ? "auto" : "80px"} overflowY={"hidden"}>
              <Text color="blackAlpha.800" mt={2}>
                {course["description"]}
              </Text>
              
              {course["cross-listed"] && 
                <>
                <Text fontWeight={"bold"} mt={2}>Cross Listed Courses: </Text>
                <List>

                  {course["cross-listed"].map((cross) => (
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="green.500"/>
                      {cross}
                    </ListItem>
                  )) }
              </List></>}
              </Box>
              <Center>
            <Box id={""+index} p={2} _hover={{cursor: "pointer"}} onClick={() => infoClasses.includes(course["number"]) ? showLessInfo(course["number"], index) : showMoreInfo(course["number"], index)}>
              {infoClasses.includes(course["number"]) ? <ChevronUpIcon/> : <ChevronDownIcon/>}
            </Box>
          </Center>
          {cartClasses.includes(course["number"]) ? (
            <IconButton aria-label='Delete Class' 
            colorScheme={"red"} icon={<DeleteIcon/>}
            top={2} size={"sm"} right={2} position={'absolute'} 
            onClick={() => removeClass(course["number"])}/>
          ) : (
            <IconButton aria-label='Add Class' 
            colorScheme={"teal"} icon={<AddIcon/>}
            top={2} size={"sm"} right={2} position={'absolute'} 
            onClick={() => addClass(course["number"])}/>
          )}
          
        </Box>
      )))
    } 
    </SimpleGrid>
  </>)
}
