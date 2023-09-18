import { Box, Button, Tag, Icon, Text, Drawer, DrawerBody, DrawerFooter, useDisclosure, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton,} from '@chakra-ui/react'
import { useRef, useState, Dispatch, SetStateAction } from "react";
import courses from '../data/courses.json';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Cart( {cartClasses} : {cartClasses : number[]}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null);
  const [showDelete, setShowDelete] = useState(0);

  return (
    <>

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

          <DrawerBody>
            {cartClasses.length ? (courses.map((course, index) => (
              cartClasses.includes(course["number"]) &&
              <Box p={2} mb={2} key={index} height={"fit-content"} border={"1px solid grey"} borderRadius={3} onMouseEnter={e => {setShowDelete(course["number"])}} onMouseLeave={e => {setShowDelete(0)}}>
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
