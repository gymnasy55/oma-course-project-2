import { Server } from './Server.js'
import { ServerOptions } from './service/ServerOptions.js'
import { MySqlConnector } from './connectors/MySqlConnector.js'
import { Person } from './models/Person/Person.js'
import { User } from './models/User/User.js'

const server = new Server(5000)

const connection = new MySqlConnector()

server.addRoute(new ServerOptions('GET', 'mysql/persons'), (req, res) => {
  connection.getAllPersons((err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
    res.status(200).json(persons)
  })
})

server.addRoute(new ServerOptions('GET', 'mysql/users'), (req, res) => {
  connection.getAllUsers((err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    const users = rows.map(row => new User(row.id, row.login, row.password, row.deleted))
    res.status(200).json(users)
  })
})

server.addRoute(new ServerOptions('GET', 'mysql/persons/:id'), (req, res) => {
  connection.getPersonsByUserId(Number(req.params.id), (err, rows) => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    const row = rows[0]
    const person = new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.deleted)
    res.status(200).json(person)
  })
})

server.addRoute(new ServerOptions('DELETE', 'mysql/persons/:id'), (req, res) => {
  connection.deletePersonById(Number(req.params.id), err => {
    if(err) {
      return console.error(`Error: ${err.message}`)
    }
    res.status(200).json({message: `Person with id:${req.params.id} deleted successfully`})
  })
})

server.serve(function () {
  console.log('Server has been started...')
})