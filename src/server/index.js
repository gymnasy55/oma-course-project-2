import {Server} from './Server.js'
import {MySqlConnector} from "./connectors/MySqlConnector.js";

const connectionOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'oma-project-2',
}

const mySqlConnector = new MySqlConnector(connectionOptions)
mySqlConnector.open(() => {
  console.log('Connection to MySQL successfully opened')
})

const server = new Server()

server.addRoute({
  method: 'GET',
  url: 'users'
}, (req, res) => {
  mySqlConnector.query('SELECT * FROM persons', rows => {
    res.status(200).send(rows);
  })
})

server.serve()