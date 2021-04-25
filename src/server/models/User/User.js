import { BaseModel } from '../BaseModel.js'

class User extends BaseModel {
  constructor(id, login, password, isDeleted) {
    super(id, isDeleted)
    this.id = id
    this.login = login
    this.password = password
  }
}

export { User }