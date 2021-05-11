import mongoose from 'mongoose'
import { BaseConnector } from './BaseConnector.js'
import { JsonReader } from '../service/JsonReader.js'

const PersonSchema= new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  deleted: {
    type: Number,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  }
})

class MongoDbConnector extends BaseConnector {
  #connection
  #PersonModel

  constructor() {
    super()

    const connectionUrl = new JsonReader().read('connections.json').mongodb_connection.url
    this.#open(connectionUrl)
  }

  async #open(connectionUrl) {
    this.#connection = mongoose.createConnection(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, err => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }

      console.log('Connection to MongoDB successfully opened')
    })

    this.#PersonModel = this.#connection.model('Person', PersonSchema)
  }

  getAllPersons(func) {
    super.getAllPersons()
    this.#PersonModel.find({}, (err, result) => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      func(null, result)
    })
  }

  getPersons(func) {
    super.getPersons()
    this.#PersonModel.find({ deleted: 0 }, (err, result) => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      func(null, result)
    })
  }

  getPersonsByUserId(userId, func) {
    super.getPersonsByUserId(userId)
    this.#PersonModel.find({ deleted: 0, user_id: userId }, (err, result) => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      func(null, result)
    })
  }

  getDeletedPersonsByUserId(userId, func) {
    super.getDeletedPersonsByUserId(userId)
    this.#PersonModel.find({ deleted: 1, user_id: userId }, (err, result) => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
      func(null, result)
    })
  }

  postPerson(person, func) {
    const mongoPerson = new this.#PersonModel({
      _id: new mongoose.Types.ObjectId(),
      deleted: 0,
      ...person
    })

    mongoPerson.save(err => {
      if (err) {
        return console.error(`Error: ${err.message}`)
      }
    })
  }

  async putPerson(person, func) {
    super.putPerson(person)

    await this.#PersonModel.findOneAndUpdate({_id: person.id}, {...person})
  }

  async deletePersonById(personId, func) {
    super.deletePersonById(personId)

    await this.#PersonModel.findOneAndUpdate({_id: personId}, {deleted: 1})
    func(null)
  }
}

export { MongoDbConnector }