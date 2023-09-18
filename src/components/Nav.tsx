import Cart from "./Cart";
import { Box, Button, Flex, Tag, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";

export default function Nav({ cartClasses } : { cartClasses : number[]}, {setClasses} : {setClasses : Dispatch<SetStateAction<number[]>>}) {
  return(
  <>
    <Flex justify={"space-between"} mt={10}>
      <Text fontWeight={"bold"} fontSize={30}>Penn Course Cart</Text>
      <Cart cartClasses={cartClasses} {...setClasses}/>
    </Flex>
  </>
  )
}