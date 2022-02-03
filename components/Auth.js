import { Input, InputGroup, InputLeftElement, Button, Flex } from "@chakra-ui/react"
import { FaKey, FaSlackHash } from "react-icons/fa"
import {useState} from "react"
const Auth = ({socket}) => {
    function auth(e) {
        socket.emit('auth', key.trim().toLowerCase());
    }
    const [key, setKey] = useState(null)
    return (
        <Flex align="center" justify="center" direction="column">
                <Input onChange={(e) => setKey(e.target.value)}weight= "bold" variant="solid" type='tel' placeholder='Participant key' />
            <Button onClick={auth} w="64px" m="4"><FaKey size="50%" /></Button>
        </Flex>
    )
}

export default Auth;