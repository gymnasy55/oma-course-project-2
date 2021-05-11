import { Server } from './Server.js'

const PORT = process.env.PORT || 5000

const server = new Server(PORT)

server.serve(() => {
  console.log(`Server has been started on port ${PORT}...`)
})