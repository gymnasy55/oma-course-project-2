import {Server} from './Server.js'
import {MySqlConnector} from "./connectors/MySqlConnector.js";
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const connectionsOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'connections.json')))

const mySqlConnector = new MySqlConnector(connectionsOptions.mysql_connection)
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