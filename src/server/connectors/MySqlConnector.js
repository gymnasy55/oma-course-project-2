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
    super.getAllPersons(func)
    this.#query('SELECT * FROM persons', func)
  }

  getPersons(func) {
    super.getPersons(func)
    this.#query('SELECT * FROM persons WHERE deleted=0', func)
  }

  getAllUsers(func) {
    super.getAllUsers(func)
    this.#query('SELECT * FROM users', func)
  }

  getUsers(func) {
    super.getUsers(func)
    this.#query('SELECT * FROM users WHERE deleted=0', func)
  }

  getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId, func)
    this.#query(`SELECT * FROM persons WHERE user_id=${userId}`, func)
  }

  postPerson(person, func) {
    super.postPerson(person, func)
    this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.userId}', FALSE)`, func)
  }

  putPerson(person, func) {
    super.putPerson(person, func)
    this.#query(`UPDATE persons SET fname='${person.fname}', lname='${person.lname}', age=${person.age}, city='${person.city}', phoneNumber='${person.phoneNumber}', email='${person.email}', companyName='${person.companyName}' WHERE id=${person.id}`, func)
  }

  postUser(user, func) {
    super.postUser(user, func)
    this.#query(`INSERT INTO users VALUES (DEFAULT, '${user.login}', '${user.password}', FALSE)`)
  }

  putUser(user, func) {
    super.putUser(user, func)
    this.#query(`UPDATE users SET login='${user.login}', password='${user.password}' WHERE id=${user.id}`, func)
  }

  deletePersonById(personId, func) {
    super.deletePersonById(personId, func)
    this.#query(`UPDATE persons SET deleted=1 WHERE id=${personId}`, func)
  }

  deleteUserById(userId, func) {
    super.deleteUserById(userId, func)
    this.#query(`UPDATE persons SET deleted=1 WHERE user_id=${userId}`, () => {})
    this.#query(`UPDATE users SET deleted=1 WHERE id=${userId}`, func)
  }
}

export { MySqlConnector }