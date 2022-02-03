import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import {FaHandPaper} from "react-icons/fa"
import { AiFillStop} from "react-icons/ai"
import {GiLightBulb} from "react-icons/gi"

const Buzzer = ({socket, state}) => {
    return <Button onClick ={() => socket.emit('buzz')} disabled={!state.ready} flex="1" w="100%" m="4" shadow="md" colorScheme={state.winner ? `green` : `blue` } borderRadius="3xl">
            <FaHandPaper size="30%"  />
          </Button> 
  
  }
  
  const Moderator = ({socket, state}) => {
    const start = () => {
      socket.emit('start');
      console.log('Sent start signal to server.');
    }
    const stop = () => {
      socket.emit('stop');
      console.log('Sent stop signal to server.');
    }
    return <>
    
    <Button disabled={state.ready} onClick={start} shadow="md" colorScheme="green" flex="1"  w="100%" m="4" borderRadius="3xl">
        <GiLightBulb size="50%" />
    </Button>
    <Button disabled={!state.ready} onClick ={stop} shadow="md" colorScheme="red" flex="1" w="100%" m="4" borderRadius="3xl">
        <AiFillStop size="50%" />
    </Button>
  
    </>
  
  }
const Buttons = ({socket, state}) => {
    return (
      <>
      {
        state.key == '1' ? <Moderator socket={socket} state={state} /> : <Buzzer socket={socket} state={state} />
      } 

        </>
    )
}

export default Buttons