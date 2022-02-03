import { useState, useEffect } from "react";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import io from "socket.io-client"
import Buttons from "../components/Buttons"
import Auth from "../components/Auth"

function Index() {
  const [state, setState] = useState({
    key: null,
    ready: true,
    winner: null,
    inputs: null,
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
        setState(prevState => ({...prevState, ready: true}))
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

      socket.on('auth', (id) => {
        setState(prevState => ({...prevState, key: id}))
        console.log('Received authentication from server')
      })

      socket.on('buzz', (arr) => {
        setState(prevState => ({...prevState, inputs : arr}))
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
        state.key === null ? <Auth socket={socket} /> 
          : isLoading ? <Spinner />
            : <Buttons socket={socket} state={state} />
      } 

    </Flex>
  )
}

export default Index;
