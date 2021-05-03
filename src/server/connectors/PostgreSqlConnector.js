import { BaseConnector } from './BaseConnector.js'
import pg from 'pg'
import { JsonReader } from '../service/JsonReader.js';

class PostgreSqlConnector extends BaseConnector {
  #connection

  constructor() {
    super()
    const connections = new JsonReader().read('connections.json')
    this.#connection = new pg.Client({
      ...connections.postgresql_connection
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