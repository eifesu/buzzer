import { Server } from 'socket.io'

const ioHandler = (req, res) => {

    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server)
        let inputs = [];
        let index = 0;
        let target = "";

        io.on('connection', socket => {


            console.log(`A user with id ${socket.id} connected`);
            socket.join("clients");
            console.log(`Currently having ${io.sockets.adapter.rooms.get("clients").size}`)

            socket.on('start', () => {
                io.to("clients").emit('start');
                console.log('Received start signal from client')
            })

            socket.on('stop', () => {
                io.to("clients").emit('stop');
                inputs = [];
                console.log('Received stop signal from client.')
            })

            socket.on('buzz', (state) => {
                // Looking out for duplicates
                if(inputs.filter(input => input.id == socket.id).length > 0) {
                    console.log(`Received duplicate buzz from client ${socket.id}`)
                } else {
                    inputs.push({
                        name: state.name,
                        team: state.team,
                        id: socket.id
                    });
                }

                // Recording the inputs
                console.log("---Buzz Record---")
                for(let buzz of inputs) {
                    console.info(buzz)
                }
                console.log("---End--- \n")
                
                // Finding the user that has the hand
                target = inputs[index].id;
                io.to(target).emit("hand");


            })

            socket.on('auth', (input) => {
                const {key, name, team} = input;
                socket.emit('auth', key, name, team);
            })

            socket.on('correct', () => {
                target = inputs[index].id;
                io.to(target).emit('correct');
            })

            socket.on('wrong', () => {
                target = inputs[index].id;
                io.to(target).emit('wrong');
            })

            socket.on('next', () => {
                index++
            })
        })

        res.socket.server.io = io
    } else {
        console.log('Socket.io already running')
    }
    res.end()
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler