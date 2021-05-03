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
}

export { PostgreSqlConnector }