const http = require('http')
const app = require('./app')
const postController = require('./controller/post.constroller')
const {Server} = require("socket.io");
const port = (process.env.PORT || 3001)
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

app.set('port', port)

server.on('listening', () => {
    const address = server.address()
    const bind = 'port : ' + port
    console.log(bind)
    console.log(address)
})

io.on("connection", async (socket) => {
    console.log('connect')
    let data = await postController.getAllPost()
    console.log('received')
    socket.emit('received', data)

    socket.on("message", async (arg) => {
        console.log(arg)
        await postController.createPost(arg)
        data = await postController.getAllPost().then( (a)=>{
            io.emit('received', a)
            console.log(a)
        }
        )
        console.log('received')
    })
});

server.listen(process.env.PORT || 3001)