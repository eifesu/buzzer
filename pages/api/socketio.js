import { Server } from 'socket.io'

const ioHandler = (req, res) => {

    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io');

        const io = new Server(res.socket.server)
        let buzzes = [];


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
                buzzes = [];
                console.log('Received stop signal from client.')
            })

            socket.on('buzz', () => {
                if(!buzzes.includes(socket.id)) {
                    buzzes.push(socket.id);
                    if(buzzes[0] == socket.id) {
                        io.to("clients").emit("win", socket.id);
                    }
                }
                console.log("LEADERBOARD")
                for(let buzz of buzzes) {
                    console.log(buzz)
                }
                io.to("clients").emit("buzz", buzzes);
            })

            socket.on('auth', (key) => {
                switch(key) {
                    case '0': {
                        socket.emit("auth", '0')
                    }
                    break;
                    case '1': {
                        socket.emit("auth", '1')
                    }
                    break;
                }
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