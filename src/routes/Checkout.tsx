import courses from '../data/courses.json';
import { Box, Text, VStack, Button, Center } from '@chakra-ui/react'
import Prereqs from '../components/Prereqs';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from '../lib/useQuery';

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

      {query.get("classes")?.length==0 && <Text fontSize={"2xl"}>Your Cart is Empty!</Text>}

      {/* Lists basic course info for the courses in the cart*/}
      {courses.map((course, index) => (
        (query.get("classes")?.includes(""+course["number"]) && 
        <Box bgColor={"blackAlpha.50"} boxShadow={"md"} key={index} borderRadius={5} border={"black 1px solid"} w={"50vw"} p={5} mb={3}>
          <Text fontWeight={"bold"} fontSize={"xl"}>{course["dept"]} {course["number"]}</Text>
          <Text fontSize={"lg"}>{course["title"]}</Text>
          <Box overflowY={"scroll"} h={"14vh"} my={3}>
            <Text>{course["description"]}</Text>
          </Box>
          
          {course["prereqs"] && <Prereqs prereqs={course["prereqs"]}/>}
        </Box>)
      ))}
      </VStack>
    </Center>
  </>)
}
