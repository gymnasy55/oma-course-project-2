import { BaseConnector } from './BaseConnector.js'
import pg from 'pg'
import path from 'path'
import fs from 'fs'

class PostgreSqlConnector extends BaseConnector {
  #connection

  constructor() {
    super()
    const __dirname = path.resolve()
    const connections = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'connections.json')))
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