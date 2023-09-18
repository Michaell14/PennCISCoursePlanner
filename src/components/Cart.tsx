import { Box, Button, Tag, Icon, Text, Drawer, DrawerBody, DrawerFooter, useDisclosure, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton} from '@chakra-ui/react'
import { useRef, useState } from "react";
import courses from '../data/courses.json';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';


//I initially wanted to use Firebase's firestore as a database to store the classes for this project because I could
//easily update and edit classes using react-firebase-hooks.
//However I saw that the project description wanted me to use React Router. I was trying to implement a way for me to 
//pass in a usestate hook as a hook so I could remove classes from the classes array, but I spent too long trying to figure it out and eventually decided to remove classes in Courses.tsx. 
export default function Cart( {cartClasses} : {cartClasses : number[]}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null);

  return (
    <> 
      {/* Button that opens the Cart drawer */}
      <Button aria-label='View Cart' ref={btnRef} onClick={onOpen}>
        <Icon as={AiOutlineShoppingCart} />
          <Tag ml={2} size={"sm"} variant='solid' colorScheme='teal'>
            {cartClasses.length}
          </Tag>
      </Button>

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"bold"} fontSize={"2xl"}>Checkout Your Cart:</DrawerHeader>

          {/* Lists current classes in the cart */}
          <DrawerBody>
            {cartClasses.length ? (courses.map((course, index) => (
              cartClasses.includes(course["number"]) &&
              <Box bgColor={"blackAlpha.100"} boxShadow={"base"} p={2} mb={2} key={index} height={"fit-content"} border={"1px solid grey"} borderRadius={3}>
                <Text fontWeight={"600"}>{course["dept"]} {course["number"]}</Text>
                <Text fontSize="sm">{course["title"]}</Text>
              </Box>
            ))) : <Text>There are no classes in Cart</Text>}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Link to={`/checkout?classes=${cartClasses.join(";")}`}><Button colorScheme='blue'>Checkout</Button></Link>
          </DrawerFooter>
        </DrawerContent>
        </Drawer>
        </>
  )
}
