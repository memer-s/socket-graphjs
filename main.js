const express = require('express')
const {Server} = require('socket.io')

const app = express()
const io = new Server({cors: {origin: '*'}})

app.use(express.static('app/dist'))

let sum = 0;
let index = 0;

io.on("connection", (socket) => {
   console.log('Hello')
   sum = 0;
   index = 0;
})

setInterval(function () {
   io.sockets.emit("newdata", Math.sqrt(sum * 6))
   console.log('newdata')
   sum += 1 / (Math.pow((index + 1), 2))
   index += 1;
}, 400)

io.listen(8080)
app.listen(3000, (console.log('localhost:3000')))
