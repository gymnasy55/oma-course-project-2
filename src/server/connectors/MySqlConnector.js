import mysql from 'mysql'

class MySqlConnector {
  #connection

  constructor(options) {
    this.#connection = mysql.createConnection({
      host: options.host,
      user: options.user,
      password: options.password,
      database: options.database,
    })
  }

  open(callback) {
    this.#connection.connect(err => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      callback()
    })
  }

  query(query, callback) {
    let result = null;
    this.#connection.query(query, (err, rows, fields) => {
      if(err) {
        return console.error(`Error: ${err.message}`)
      }
      result = callback(rows, fields)
    })
    return result;
  }

  close(callback) {
    this.#connection.end(err => {
      if(err) {
        return console.error(`Error: ${err.message}`)
      }
      callback()
    })
  }
}

export {MySqlConnector}