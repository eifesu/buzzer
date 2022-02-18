import { useState, useEffect } from "react";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import io from "socket.io-client"
import Buttons from "../components/Buttons"
import Auth from "../components/Auth"



function Index() {
  const [state, setState] = useState({
    name: '',
    team: '',
    key: null,
    ready: true,
    winner: null,
    inputs: [],
    index: 0,
  })

 
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      setIsLoading(true);
      const socket = io()
      const { uri } = socket.io;

      socket.on('connect', () => {
        console.log(`Successfully connected to ${uri}`);
        setSocket(socket);
        setIsLoading(false);
      })

      socket.on('start', () => {
        setState(prevState => ({...prevState, ready: true, inputs: []}))
        console.log('Received client side start from server.');
      })

      socket.on('stop', () => {
        setState(prevState => ({...prevState, ready: false, winner: false}))
        console.log('Received client side stop from server.')
      })

      socket.on('win', (id) => {
        setState(prevState => ({...prevState, winner: socket.id == id}))
        console.log('Received the name of the winner');
      })

      socket.on('auth', (key, name, team) => {
        setState(prevState => ({...prevState, key: key, name: name, team: team}))
        console.log('Received authentication from server')
      })

      socket.on('buzz', (inputs) => {
        setState(prevState => ({...prevState, inputs: inputs}))
      })

      socket.on('next', (i, inputs) => {
        setState(prevState => ({...prevState, index: i, winner : inputs[i].name == socket.name }));
      })


    })
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Flex p="5" h="100%" w="100%" justify="center" align="center" direction="column">

      {/* { isLoading ? <Spinner /> :  } */}
 {
        state.key === null ? <Auth socket={socket} setState={setState} state={state}/> 
          : isLoading ? <Spinner />
            : <Buttons socket={socket} state={state} />
      } 

    </Flex>
  )
}

export default Index;
