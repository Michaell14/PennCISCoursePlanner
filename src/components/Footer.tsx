import { Box, Text, Link, List, ListItem, ListIcon, IconButton, VStack, Center, Input, useToast, useDisclosure } from '@chakra-ui/react'

export default function Footer(){
    return(
        <>
            <Box>
                <Text py={10} fontWeight={"bold"} fontSize={30} position={'absolute'} right={20}>Made by <Link href="https://www.itsmichael.dev/" target="_blank" color={"red.400"}>Michael.</Link></Text>
            </Box>
        </>
    )
} 