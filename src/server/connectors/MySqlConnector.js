import { BaseConnector } from './BaseConnector.js';
import mysql from 'mysql'
import fs from 'fs'
import path from 'path'

class MySqlConnector extends BaseConnector {
  #connection

  constructor() {
    super()
    const __dirname = path.resolve()
    const connections = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'connections.json')))
    this.#connection = mysql.createConnection({
      ...connections.mysql_connection
    })
    this.#open()
  }

  #open() {
    this.#connection.connect(err => {
      if(err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to MySQL successfully opened')
    })
  }

  #query(query, func) {
    this.#connection.query(query, func)
  }

  close() {
    this.#connection.end(err => {
      if(err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to MySQL successfully closed')
    })
  }

  getAllPersons(func) {
    super.getAllPersons()
    this.#query('SELECT * FROM persons', func)
  }

  getAllUsers(func) {
    super.getAllUsers()
    this.#query('SELECT * FROM users', func)
  }

  getPersonsByUserId(userId, func) {
    super.getPersonsByUserId()
    this.#query(`SELECT * FROM persons WHERE user_id=${userId}`, func)
  }

  postPerson(person) {
    super.postPerson()
    this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.userId}', FALSE)`)
  }

  postUser(user) {
    super.postUser()
    this.#query(`INSERT INTO users VALUE (DEFAULT, '${user.login}', '${user.password}', FALSE`)
  }

  deletePersonById(personId, func) {
    super.deletePersonById()
    this.#query(`DELETE FROM persons WHERE id=${personId}`, func)
  }
}

export { MySqlConnector }