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
    const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id,row.deleted))
    res.status(200).json(persons)
  })
})

server.addRoute(new ServerOptions('POST', 'mysql/persons'), (req, res) => {
  const body = req.body
  if(body.fname && typeof body.fname === 'string'
      && body.lname && typeof body.lname === 'string'
      && body.age && typeof body.age === 'number' && body.age % 1 === 0
      && body.city && typeof body.city === 'string'
      && body.phoneNumber && typeof body.phoneNumber === 'string'
      && body.email && typeof body.email === 'string'
      && body.companyName && typeof body.companyName === 'string'
      && body.userId && typeof body.userId === 'number' && body.userId > 0) {
    connection.postPerson(body)
    res.status(201).json({message: 'Person creation succeeded'})
    return
  }
  res.status(400).json({message: 'Person creation failed'})
})

server.addRoute(new ServerOptions('POST', 'mysql/persons'), (req, res) => {
  const body = req.body
  if(body.login && typeof body.login === 'string'
     && body.password && typeof body.password === 'string') {
    connection.postUser(body)
    res.status(201).json({message: 'User creation succeeded'})
    return
  }
  res.status(400).json({message: 'User creation failed'})
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