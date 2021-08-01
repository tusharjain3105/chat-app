const express = require('express')
const userRouter = require('./routers.js/user')
const app = express()
const port = process.env.PORT || 3000
const {createServer}  = require('http')
const { Server } = require('socket.io')
const server = createServer(app)
const io = new Server(server)

app.use(express.urlencoded())
app.use(userRouter)

app.use(express.static('chat/public'))

io.on('connection',(socket)=>{
    socket.on('newUser',user=>{
        io.emit('newUser',user)
    })
    socket.on('msg',(msg)=>{
        io.emit('msg',{...msg})
    })
})
    
server.listen(port)