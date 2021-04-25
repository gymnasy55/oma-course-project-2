import { Server } from './Server.js'

const server = new Server(5000)

server.serve(function () {
  console.log('Server has been started...')
})