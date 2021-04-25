import { BaseModel } from '../BaseModel.js'

class Person extends BaseModel {
  constructor(id, fname, lname, age, city, phoneNumber, email, companyName, userId, isDeleted) {
    super(id, isDeleted)
    this.fname = fname
    this.lname = lname
    this.age = age
    this.city = city
    this.phoneNumber = phoneNumber
    this.email = email
    this.companyName = companyName
    this.userId = userId
  }
}

export { Person }