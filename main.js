const express = require('express')
const {Server} = require('socket.io')

const app = express()
const io = new Server({cors: {origin: '*'}})

app.use(express.static('app/dist'))

let index = 0;

io.on("connection", (socket) => {
   console.log('Hello')
})

setInterval(function () {
   io.sockets.emit("newdata", index)
   console.log('newdata')
   index += 0.1;
}, 1000)

io.listen(8080)
app.listen(3000, (console.log('localhost:3000')))
