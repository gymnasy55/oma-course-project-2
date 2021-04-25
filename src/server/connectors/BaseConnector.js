class BaseConnector {
  getAllPersons() {}
  getAllUsers() {}
  getPersonsByUserId(userId) {}

  postPerson(person) {}
  postUser(user) {}

  putPerson(person) {}
  putUser(user) {}

  deletePersonById(personId) {}
}

export { BaseConnector }