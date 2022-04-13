import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import { FaHandPaper } from "react-icons/fa"
import { AiFillStop, AiOutlineCheck } from "react-icons/ai"
import {BiRefresh} from "react-icons/bi"
import { GiLightBulb } from "react-icons/gi"
import {ImCross} from "react-icons/im"


const Buzzer = ({ socket, state }) => {

  let audio = new Audio("/cue_buzz.mp3")
  return <Button onClick={() => {
    socket.emit('buzz', state); 
    socket.emit('ping');
    audio.play();
  }}
     disabled={!state.ready} flex="1" w="100%" m="4" shadow="md" colorScheme={
    state.wrong 
    ? `red`
    : state.correct 
      ? `green` 
      : `blue`} borderRadius="3xl">
    <FaHandPaper size="25%" />
  </Button>

}

const Moderator = ({ socket, state }) => {
  const start = () => {
    socket.emit('start');
    console.log('Sent start signal to server.');
  }
  const stop = () => {
    socket.emit('stop');
    console.log('Sent stop signal to server.');
  }

  const correct = () => {
    socket.emit('correct');
    console.log('Sent correct signal to the current user');
  }

  const wrong = () => {
    socket.emit('wrong');
    console.log('Sent wrong signal to the current client')
  }

  
  return <> 

    <Flex  m="4" flex="1" w="100%" align="center" justify="center">
    <Button m="4" h="100%" disabled={state.ready} shadow="md" colorScheme="gray" flex="1" w="100%" borderRadius="3xl">
        {state.winnerTeam ? 
        <Flex direction="column">
          <Heading >
          {state.winnerTeam} 
          </Heading>

          <Heading size="sm">
          {state.winnerName } 
          </Heading>
        </Flex> :  
        `...`}
      </Button>
    </Flex>


    <Flex  m="4" flex="1" w="100%" align="center" justify="center">
      <Button  m="4" h="100%" disabled={state.ready} onClick={start} shadow="md" colorScheme="blue" flex="1"  borderRadius="3xl">
        <GiLightBulb size="25%" />
      </Button>
      <Button  m="4" h="100%" disabled={!state.ready} onClick={stop} shadow="md" colorScheme="yellow" flex="1"  borderRadius="3xl">
        <AiFillStop size="25%" />
      </Button>
    </Flex>

    <Flex  m="4" flex="1" w="100%" align="center" justify="center">
      <Button  m="4" h="100%" flex="1" disabled={state.inputs.length > 0} onClick={correct} shadow="md" colorScheme="green"   borderRadius="3xl">
        <BiRefresh size="25%" />
      </Button>
      <Button  m="4" h="100%" flex="1" disabled={state.inputs.length > 0} onClick={wrong} shadow="md" colorScheme="red"  borderRadius="3xl">
        <ImCross size="25%" />
      </Button>
    </Flex>
    

  </>

}
const Buttons = ({ socket, state }) => {
  return (
    <>
      {
        state.key == '1' ? <Moderator socket={socket} state={state} /> : <Buzzer socket={socket} state={state} />
      }

    </>
  )
}

export default Buttons