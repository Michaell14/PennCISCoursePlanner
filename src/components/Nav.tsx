import Cart from "./Cart";
import { Flex, Text } from '@chakra-ui/react'

export default function Nav({ cartClasses } : { cartClasses : number[]}) {
  return(
  <>
    <Flex justify={"space-between"} mt={10}>
      <Text fontWeight={"bold"} fontSize={30}>Penn Course Cart</Text>
      <Cart cartClasses={cartClasses}/>
    </Flex>
  </>
  )
}