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

  getPersonsByUser(user_id, func) {
    super.getPersonsByUser()
    this.#query(`SELECT * FROM persons WHERE user_id=${user_id}`, func)
  }

  deletePersonById(person_id, func) {
    super.deletePersonById()
    this.#query(`DELETE FROM persons WHERE id=${person_id}`, func)
  }
}

export { MySqlConnector }