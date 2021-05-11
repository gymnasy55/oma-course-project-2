import { BaseConnector } from './BaseConnector.js'
import redis from 'async-redis'
import { JsonReader } from '../service/JsonReader.js'

const TABLE = 'persons'

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

    const reply = await this.#client.zrange(TABLE, 0, -1)

    func(null, reply.map(JSON.parse))
  }

  // TODO: this
  async getPersons(func) {
    super.getPersons()

    const reply = await this.#client.zrange(TABLE, 0, -1)

    func(null, reply.map(JSON.parse).filter(person => person.deleted === 0))
  }

  async getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId)

    const reply = await this.#client.zrange(TABLE, 0, -1)

    func(null, reply.map(JSON.parse).filter(person => person.user_id === userId && person.deleted === 0))
  }

  async getDeletedPersonsByUserId(userId, func) {
    super.getDeletedPersonsByUserId(userId)

    const reply = await this.#client.zrange(TABLE, 0, -1)

    func(null, reply.map(JSON.parse).filter(person => person.user_id === userId && person.deleted !== 0))
  }

  async postPerson(person, func) {
    super.postPerson(person)

    const count = await this.#client.zcount(TABLE, '-inf', '+inf')

    if (person.hasOwnProperty('id')) {
      delete person.id
    }

    const dbPerson = Object.assign({ id: count + 1, deleted: 0 }, person)

    await this.#client.zadd(TABLE, count + 1, JSON.stringify(dbPerson))
  }

  async putPerson(person, func) {
    super.putPerson(person)

    let dbPerson = Object.assign({ deleted: 0 }, person)
    await this.#client.zremrangebyscore(TABLE, `${person.id}`, `${person.id}`)
    await this.#client.zadd(TABLE, person.id, JSON.stringify(dbPerson))
  }

  async deletePersonById(personId, func) {
    super.deletePersonById(personId)
    const reply = await this.#client.zrangebyscore(TABLE, `${personId}`, `${personId}`)
    const dbPerson = JSON.parse(reply[0])
    dbPerson.deleted = 1
    await this.#client.zremrangebyscore(TABLE, `${personId}`, `${personId}`)
    await this.#client.zadd(TABLE, personId, JSON.stringify(dbPerson))
    func(null)
  }
}

export { RedisConnector }