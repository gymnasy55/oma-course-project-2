import express, { Router } from 'express'
import cors from 'cors'
import { logger } from './middlewares/logger.js'
import { MySqlConnector } from './connectors/MySqlConnector.js'
import { PostgreSqlConnector } from './connectors/PostgreSqlConnector.js'
import { RouteOptions } from './service/RouteOptions.js'
import { Person } from './models/Person/Person.js'
import { User } from './models/User/User.js'

class Server {
  #app
  #PORT
  #router

  constructor(PORT) {
    this.#PORT = PORT || 8080
    this.#app = express()
    this.#router = Router()

    const mySqlConnector = new MySqlConnector()
    const postgreSqlConnector = new PostgreSqlConnector('postgresql')
    const h2SqlConnector = new PostgreSqlConnector('h2sql')
    this.#enableMySqlUsers(mySqlConnector)
    this.#enableSql(mySqlConnector, 'mysql')
    this.#enableSql(postgreSqlConnector, 'postgresql')
    this.#enableSql(h2SqlConnector, 'h2sql')
  }

  addRoute(options, func) {
    switch (options.method) {
      case 'GET':
        this.#router.get(`/api/${options.url}`, func)
        break
      case 'POST':
        this.#router.post(`/api/${options.url}`, func)
        break
      case 'PUT':
        this.#router.put(`/api/${options.url}`, func)
        break
      case 'DELETE':
        this.#router.delete(`/api/${options.url}`, func)
        break
    }
  }

  #enableMySqlUsers(connector) {
    this.addRoute(new RouteOptions('GET', 'mysql/users'), (req, res) => {
      connector.getUsers((err, rows) => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        const users = rows.map(row => new User(row.id, row.login, row.password, row.deleted))
        res.status(200).json(users)
      })
    })

    this.addRoute(new RouteOptions('POST', 'mysql/auth'), (req, res) => {
      const body = req.body
      if(typeof body.login === 'string'
          && typeof body.password === 'string') {
        connector.getUserByLoginAndPassword(body, (err, rows) => {
          if(err) {
            return console.error(`Error: ${err.message}`)
          }
          if(rows.length > 0) {
            res.status(200).json({ message: "Authorized" })
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        })
      }

    })

    this.addRoute(new RouteOptions('GET', 'mysql/users/all'), (req, res) => {
      connector.getAllUsers((err, rows) => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        const users = rows.map(row => new User(row.id, row.login, row.password, row.deleted))
        res.status(200).json(users)
      })
    })

    this.addRoute(new RouteOptions('POST', 'mysql/users'), (req, res) => {
      const body = req.body
      if(body.login && typeof body.login === 'string'
        && body.password && typeof body.password === 'string') {
        connector.postUser(body)
        res.status(201).json({message: 'User creation succeeded'})
        return
      }
      res.status(400).json({message: 'User creation failed'})
    })

    this.addRoute(new RouteOptions('PUT', 'mysql/users'), (req, res) => {
      const body = req.body
      if(body.login && typeof body.login === 'string'
        && body.password && typeof body.password === 'string') {
        connector.putUser(body)
        res.status(200).json({message: 'User update succeeded'})
        return
      }
      res.status(400).json({message: 'User update failed'})
    })

    this.addRoute(new RouteOptions('DELETE', 'mysql/users/:id'), (req, res) => {
      connector.deleteUserById(Number(req.params.id), err => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        res.status(200).json({message: `User with id:${req.params.id} deleted successfully`})
      })
    })
  }

  #enableSql(connector, dbms) {
    this.addRoute(new RouteOptions('GET', `${dbms}/persons`), (req, res) => {
      connector.getPersons((err, rows) => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        if(rows.hasOwnProperty('rows')) {
          rows = rows.rows
        }

        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new RouteOptions('GET', `${dbms}/persons/all`), (req, res) => {
      connector.getAllPersons((err, rows) => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        if(rows.hasOwnProperty('rows')) {
          rows = rows.rows
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new RouteOptions('GET', `${dbms}/persons/:id`), (req, res) => {
      connector.getPersonsByUserId(Number(req.params.id), (err, rows) => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        if(rows.hasOwnProperty('rows')) {
          rows = rows.rows
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber, row.email, row.companyName, row.user_id,row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new RouteOptions('GET', `${dbms}/persons/:id/deleted`), (req, res) => {
      connector.getDeletedPersonsByUserId(Number(req.params.id), (err, rows) => {
        if (err) {
          return console.error(`Error: ${err.message}`)
        }
        if (rows.hasOwnProperty('rows')) {
          rows = rows.rows
        }
        const persons = rows.map(row => new Person(row.id, row.fname, row.lname, row.age, row.city, row.phoneNumber,
          row.email, row.companyName, row.user_id, row.deleted))
        res.status(200).json(persons)
      })
    })

    this.addRoute(new RouteOptions('POST', `${dbms}/persons`), (req, res) => {
      const body = req.body
      if(body.fname && typeof body.fname === 'string'
        && body.lname && typeof body.lname === 'string'
        && body.age && typeof body.age === 'number' && body.age % 1 === 0
        && body.city && typeof body.city === 'string'
        && body.phoneNumber && typeof body.phoneNumber === 'string'
        && body.email && typeof body.email === 'string'
        && body.companyName && typeof body.companyName === 'string'
        && body.userId && typeof body.userId === 'number' && body.userId > 0) {
        connector.postPerson(body)
        res.status(201).json({message: 'Person creation succeeded'})
        return
      }
      res.status(400).json({message: 'Person creation failed'})
    })

    this.addRoute(new RouteOptions('PUT', `${dbms}/persons`), (req, res) => {
      const body = req.body
      if (body.id && typeof body.id === 'number'
        && body.fname && typeof body.fname === 'string'
        && body.lname && typeof body.lname === 'string'
        && body.age && typeof body.age === 'number' && body.age % 1 === 0
        && body.city && typeof body.city === 'string'
        && body.phoneNumber && typeof body.phoneNumber === 'string'
        && body.email && typeof body.email === 'string'
        && body.companyName && typeof body.companyName === 'string') {
        connector.putPerson(body)
        res.status(200).json({message: 'Person update succeeded'})
        return
      }
      res.status(400).json({message: 'Person update failed'})
    })

    this.addRoute(new RouteOptions('DELETE', `${dbms}/persons/:id`), (req, res) => {
      connector.deletePersonById(Number(req.params.id), err => {
        if(err) {
          return console.error(`Error: ${err.message}`)
        }
        res.status(200).json({message: `Person with id:${req.params.id} deleted successfully`})
      })
    })
  }

  serve(func) {
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(cors())
    this.#app.use(logger)
    this.#app.use(this.#router)
    this.#app.listen(this.#PORT, func)
  }
}

export { Server }