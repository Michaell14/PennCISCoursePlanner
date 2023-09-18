import courses from '../data/courses.json';
import { Box, Text, SimpleGrid, Button, Center, Input, useToast } from '@chakra-ui/react'
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
        <Button>
          <AiOutlineArrowLeft/>
          <Text>Go Back</Text>
        </Button>
      </Link>

    <Center>

        <Text>{query.get("classes")}</Text>
    </Center>
  </>)
}
