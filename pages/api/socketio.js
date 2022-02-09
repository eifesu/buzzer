import { Server } from 'socket.io'

const ioHandler = (req, res) => {

    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server)
        let inputs = [];
        let index = 0;

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
                const id = socket.id;
                const {key, name, team} = state;
                const buzz = {
                    key,
                    name,
                    team,
                    id
                }; 

                if(inputs.filter(buzz => buzz.id === socket.id).length <= 0) {
                    inputs.push(buzz);
                    if(inputs[0].id = socket.id) {
                        io.to("clients").emit("win", inputs[0]);
                    }
                }
                console.log("LEADERBOARD")
                for(let buzz of inputs) {
                    console.log(buzz)
                }
                io.to("clients").emit("buzz", inputs);
            })

            socket.on('auth', (input) => {
                const {key, name, team} = input;
                socket.emit('auth', key, name, team);
            })

            socket.on('correct', () => {
                io.to("clients").emit('stop');
            })

            socket.on('wrong', () => {
                index = index + 1;
                index = index % inputs.length;  
                io.to("clients").emit('next', index, inputs);
                console.log(`Current index is ${index}`)
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