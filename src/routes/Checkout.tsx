import courses from '../data/courses.json';
import { Box, Text, VStack, Button, Center, Container } from '@chakra-ui/react'
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Checkout(){

  const query=useQuery();

  return (
  
  <>

    <Link to={`/?classes=${query.get("classes")}`}>
      <Button top={10} left={10} colorScheme="blue">
        <AiOutlineArrowLeft/>
        <Text>Go Back</Text>
      </Button>
    </Link>
    
    <Center mt={10}>
      <VStack>
      <Text fontSize="5xl" fontWeight={"bold"} mb={8}>Your CIS Cart:</Text>
      {courses.map((course, index) => (

        (query.get("classes")?.includes(""+course["number"]) && 
        <Box bgColor={"blackAlpha.50"} boxShadow={"md"} key={index} borderRadius={5} border={"black 1px solid"} w={"50vw"} p={5} mb={3}>
          <Text fontWeight={"bold"} fontSize={"xl"}>{course["dept"]} {course["number"]}</Text>
          <Text fontSize={"lg"}>{course["title"]}</Text>
          <Box overflowY={"scroll"} h={"14vh"}>
            <Text>{course["description"]}</Text>
          </Box>
        </Box>)
      ))}
      </VStack>
    </Center>
  </>)
}
