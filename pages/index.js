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
    hand: null,
    correct: null,
    inputs: [],
    index: 0,
    winnerName: null,
    winnerTeam: null,
  })

  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let correct
  let wrong
  let hand
  useEffect(() => {
    correct = new Audio("/cue_correct.mp3")
    wrong = new Audio("/cue_wrong.mp3")
    hand = new Audio("/cue_hand.mp3")
  }, []);

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
        setState(prevState => ({...prevState, ready: false, hand: null, correct: null, wrong: null, winnerName: null, winnerTeam: null}))
        console.log('Received client side stop from server.')
      })

      socket.on('auth', (key, name, team) => {
        setState(prevState => ({...prevState, key: key}))
        console.log('Received authentication from server')
      })

      socket.on('hand', (name, team) => {
        setState(prevState => ({...prevState, hand: true, winner: name, winnerName: name, winnerTeam: team}));
      })

      socket.on('correct', () => {
        setState(prevState => ({...prevState, wrong: null, correct: true}))
        correct.play();
      })

      socket.on('wrong', () => {
        setState(prevState => ({...prevState, correct: null, wrong: true}))
        wrong.play();
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
