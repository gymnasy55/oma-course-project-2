import { BaseConnector } from './BaseConnector.js'
import redis from 'async-redis'
import { JsonReader } from '../service/JsonReader.js'

class RedisConnector extends BaseConnector {
  #client

  constructor() {
    super()
    const connection = new JsonReader().read('connections.json').redis_connection
    this.#client = redis.createClient(connection)
    this.#client.on('ready', err => {
      if (err) {
        return console.error(`Error: ${err}`)
      }

      console.log('Connection to Redis successfully opened')
    })
  }

  async getAllPersons(func) {
    super.getAllPersons()

    const reply = await this.#client.zrange('users', 0, -1)

    func(null, reply.map(JSON.parse))
  }

  // TODO: this
  getPersons() {}
  getPersonsByUserId(userId) {}
  getDeletedPersonsByUserId(userId) {}

  postPerson(person) {}

  putPerson(person) {}

  deletePersonById(personId) {}
}

export { RedisConnector }