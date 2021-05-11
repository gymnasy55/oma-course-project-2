import { BaseConnector } from './BaseConnector.js'
import pg from 'pg'
import { JsonReader } from '../service/JsonReader.js';

class PostgreSqlConnector extends BaseConnector {
  #connection

  constructor(mode) {
    super()
    const connection = new JsonReader().read('connections.json')
    this.mode = mode
    if(mode === 'h2sql') {
      this.#connection = new pg.Client({
        ...connection.h2sql_connection
      })
    } else {
      this.#connection = new pg.Client({
        ...connection.postgresql_connection
      })
    }

    this.#open()
  }

  #open() {
    this.#connection.connect(err => {
      if(err) {
        return console.error(`PostgreSQL or H2 error: ${err.message}`)
      }
      console.log(`Connection to ${this.mode === 'h2sql' ? 'H2' : 'PostgreSQL'} successfully opened`)
    })
  }

  #query(query, func) {
    this.#connection.query(query, func)
  }

  getAllPersons(func) {
    super.getAllPersons()
    this.#query('SELECT * FROM persons', func)
  }

  getPersons(func) {
    super.getPersons()
    this.#query('SELECT * FROM persons WHERE deleted=0', func)
  }

  getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId)
    this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=0`, func)
  }

  getDeletedPersonsByUserId(userId, func) {
    super.getDeletedPersonsByUserId(userId)
    this.#query(`SELECT * FROM persons WHERE user_id=${userId} AND deleted=1`, func)
  }

  postPerson(person, func) {
    super.postPerson(person)
    this.#query(`INSERT INTO persons VALUES (DEFAULT, '${person.fname}', '${person.lname}', ${person.age}, '${person.city}', '${person.phoneNumber}', '${person.email}', '${person.companyName}', '${person.userId}', 0)`, func)
  }

  putPerson(person, func) {
    super.putPerson(person)
    this.#query(`UPDATE persons SET fname='${person.fname}', lname='${person.lname}', age=${person.age}, city='${person.city}', phoneNumber='${person.phoneNumber}', email='${person.email}', companyName='${person.companyName}' WHERE id=${person.id}`, func)
  }

  deletePersonById(personId, func) {
    super.deletePersonById(personId)
    this.#query(`UPDATE persons SET deleted=1 WHERE id=${personId}`, func)
  }
}

export { PostgreSqlConnector }