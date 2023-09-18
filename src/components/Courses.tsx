import courses from '../data/courses.json';
import { Box, Text, SimpleGrid, List, ListItem, Tooltip, ListIcon, IconButton, VStack, Center, Input, useToast } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import Nav from './Nav';
import { useQuery } from '../lib/useQuery';
import { DeleteIcon, AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {MdCheckCircle } from "react-icons/md";
import Prereqs from './Prereqs';

export default function Courses(){

  const [cartClasses, setClasses] = useState<number[]>([]);
  const [infoClasses, setInfoClasses] = useState<number[]>([]);
  const [searchText, setSearch] = useState("");
  const toast = useToast();
  const query = useQuery();

  //Grabs the classes from the query parameters from the Checkout page
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

  //------------------------------------------------------------
  //For expanding and shrinking the class descriptions, I wanted to animate the action. However,
  //I found that I didn't have enough time to research into animation to feel confident about learning it.
  //Instead, I focused more on writing clean code and completing the necessary components of this project.
  //Expands a class description 
  function showMoreInfo(number:number, index: number){
    setInfoClasses(infoClasses => [...infoClasses, number]);
  }

  //Shrinks a class description
  function showLessInfo(number:number, index: number){
    setInfoClasses(infoClasses.filter(item => item !== number))
  }

  //Adds a class to the cart
  function addClass(number: number){
    
    //--------------------------------------------------------------------------------
    //I feel like Toasts are underutilized in most websites. IMO, they are a good and quick way
    //to let the client know if something loaded or didn't. That's why I chose to use toasts in this project
    //to quickly notify the client of updates and changes.
    //Checks if cart is at max capacity. Won't allow client to add more classes.
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

  //Removes a class from the Cart
  function removeClass(number: number){
    setClasses(cartClasses.filter(item => item !== number))
    toast({ title: "CIS " + number + " has been removed from Cart",
      description: "That class sounds hard!",
      status: 'info', duration: 3000, isClosable: true, position: "top-left"
    })
  }

  return (
  <>
    <Nav cartClasses={cartClasses}/>
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

    {/* Grid of all the CIS classes with all the details from the JSON file */}
    <SimpleGrid minChildWidth='320px' spacing='42px'>
      
      {/* Basic course info */}
      {(courses.map((course, index) => (((""+course["number"]).includes(searchText) || 
      (course["title"].toLowerCase().includes(searchText.toLowerCase()) || (course["description"].toLowerCase().includes(searchText.toLowerCase())))) && 
        <Box boxShadow={"lg"} position={"relative"} bg={"lightblue"} height={"fit-content"} px={5} pt={2} key={index} borderRadius={5}>
          <Text fontSize={20} fontWeight={"600"}>
            {course["dept"]}
            {' '}
            {course["number"]}
          </Text>
          <Text fontWeight={"bold"}>{course["title"]}</Text>

          {course["prereqs"] && <Prereqs prereqs={course["prereqs"]}/>}
            <Box height={infoClasses.includes(course["number"]) ? "auto" : "80px"} overflowY={"hidden"}>
              <Text color="blackAlpha.800" mt={2}>
                {course["description"]}
              </Text>
              
              {/* Cross-listed classes*/}
              {course["cross-listed"] && 
                <>
                <Text fontWeight={"bold"} mt={2}>Cross Listed Courses: </Text>
                <List>

                  {course["cross-listed"].map((cross, ind) => (
                    <ListItem key={ind}>
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

          {/* Add/Remove button -> It would be a good idea to turn this into a component */}
          {cartClasses.includes(course["number"]) ? (
            <Tooltip label="Remove this Class from Cart" placement="top">
              <IconButton aria-label='Delete Class' 
              colorScheme={"red"} icon={<DeleteIcon/>}
              top={2} size={"sm"} right={2} position={'absolute'} 
              onClick={() => removeClass(course["number"])}/>
            </Tooltip>
          ) : (
            <Tooltip label="Add this Class to Cart" placement="top">
              <IconButton aria-label='Add Class' 
              colorScheme={"teal"} icon={<AddIcon/>}
              top={2} size={"sm"} right={2} position={'absolute'} 
              onClick={() => addClass(course["number"])}/>
            </Tooltip>
          )}
          
        </Box>
      )))
    } 
    </SimpleGrid>
  </>)
}
