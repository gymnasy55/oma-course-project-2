import { BaseConnector } from './BaseConnector.js'
import pg from 'pg'
import { JsonReader } from '../service/JsonReader.js';

class PostgreSqlConnector extends BaseConnector {
  #connection

  constructor() {
    super()
    const connection = new JsonReader().read('connections.json').postgresql_connection
    this.#connection = new pg.Client({
      ...connection
    })
    this.#open()
  }

  #open() {
    this.#connection.connect(err => {
      if(err) {
        return console.error(`Error: ${err.message}`)
      }
      console.log('Connection to PostgreSQL successfully opened')
    })
  }

  #query(query, func) {
    this.#connection.query(query, func)
  }

  getAllPersons(func) {
    super.getAllPersons(func)
    this.#query('SELECT * FROM persons', func)
  }

  getPersons(func) {
    super.getPersons(func)
    this.#query('SELECT * FROM persons WHERE deleted=0', func)
  }

  getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId, func)
    this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=0`, func)
  }

  getDeletedPersonsByUserId(userId, func) {
    super.getDeletedPersonsByUserId(userId, func)
    this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=1`, func)
  }

  postPerson(person, func) {
    super.postPerson(person, func)
    this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.userId}', 0)`, func)
  }

  putPerson(person, func) {
    super.putPerson(person, func)
    this.#query(`UPDATE persons SET fname='${person.fname}', lname='${person.lname}', age=${person.age}, city='${person.city}', phoneNumber='${person.phoneNumber}', email='${person.email}', companyName='${person.companyName}' WHERE id=${person.id}`, func)
  }

  deletePersonById(personId, func) {
    super.deletePersonById(personId, func)
    this.#query(`UPDATE persons SET deleted=1 WHERE id=${personId}`, func)
  }
}

export { PostgreSqlConnector }