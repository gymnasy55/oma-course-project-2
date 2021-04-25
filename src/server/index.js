import { Server } from './Server.js'
import { ServerOptions } from './service/ServerOptions.js'
import { MySqlConnector } from './connectors/MySqlConnector.js';

const server = new Server(5000)

const connection = new MySqlConnector()

server.addRoute(new ServerOptions('GET', 'mysql/persons'), (req, res) => {
  connection.getAllPersons((err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    res.status(200).json(rows)
  })
})

server.addRoute(new ServerOptions('GET', 'mysql/users'), (req, res) => {
  connection.getAllUsers((err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    res.status(200).json(rows)
  })
})

server.addRoute(new ServerOptions('GET', 'mysql/persons/:id'), (req, res) => {
  connection.getPersonsByUser(Number(req.params.id), (err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    res.status(200).json(rows)
  })
})

server.serve(function () {
  console.log('Server has been started...')
})