import { Input, InputGroup, InputLeftElement, Button, Flex } from "@chakra-ui/react"
import { FaKey, FaSlackHash } from "react-icons/fa"
import {useState, useEffect} from "react"
const Auth = ({socket, setState}) => {
    function auth(e) {
        setInput(prevState => ({...prevState, 
            key : input.key.trim().toUpperCase(),
            name : input.name.trim().toUpperCase(),
            team : input.team.trim().toUpperCase(),
        }))

        socket.emit('auth', input);
        setState(prevState => ({...prevState,
            name: input.name,
            team: input.team,
        }))
    }


    const [input, setInput] = useState({
        key: "",
        name: "",
        team: ""
    })

    useEffect(() => {
       console.log(input)
    }, [input]);
    return (
        <Flex h="50%" align="center" justify="space-around" direction="column">
                <Input onChange={(e) => setInput(prevState => ({...prevState, key : e.target.value}))} weight= "bold" variant="solid" type='tel' placeholder='Participant key' />
                <Input onChange={(e) => setInput(prevState => ({...prevState, name : e.target.value}))} weight= "bold" variant="solid" type='text' placeholder='First Name' />
                <Input onChange={(e) => setInput(prevState => ({...prevState, team : e.target.value}))} weight= "bold" variant="solid" type='text' placeholder='Team Name' />
            <Button onClick={auth} w="64px" m="4"><FaKey size="50%" /></Button>
        </Flex>
    )
}

export default Auth;