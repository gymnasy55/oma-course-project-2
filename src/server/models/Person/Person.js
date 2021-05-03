import { BaseModel } from '../BaseModel.js'

class Person extends BaseModel {
  constructor(id, fname, lname, age, city, phoneNumber, email, companyName, user_id, deleted) {
    super(id, deleted)
    this.fname = fname
    this.lname = lname
    this.age = age
    this.city = city
    this.phoneNumber = phoneNumber
    this.email = email
    this.companyName = companyName
    this.user_id = user_id
  }
}

export { Person }