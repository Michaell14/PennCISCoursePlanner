import { Text, List, ListItem, ListIcon } from '@chakra-ui/react'
import { MdLabel} from "react-icons/md";

//List of course prerequisites
export default function Prereqs({prereqs} : {prereqs : string[]}){
    return(
        <>
            {prereqs && 
            <>
                <Text color={"blackAlpha.800"} mt={2}>Prerequisites: </Text>
                <List>
                {prereqs && prereqs.map((prereq, ind) => (
                    <ListItem key={ind}>
                    <ListIcon as={MdLabel} color="green.500"/>
                    {prereq}
                    </ListItem>
                )) }
            </List></>}
            
        </>
    )
}