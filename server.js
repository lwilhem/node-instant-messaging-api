const http = require('http')
const app = require('./app')
const port = (process.env.PORT||3000)
app.set('port', port)
const server = http.createServer(app)

server.on('listening', ()=>{
    const address = server.address()
    const bind = 'port : ' + port
    console.log(bind)
    console.log(address)
})
server.listen(process.env.PORT ||3000 )