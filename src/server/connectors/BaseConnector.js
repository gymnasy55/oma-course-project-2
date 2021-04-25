class BaseConnector {
  getAllPersons(func) {}
  getPersons(func) {}
  getAllUsers(func) {}
  getUsers(func) {}
  getPersonsByUserId(userId, func) {}

  postPerson(person, func) {}
  postUser(user, func) {}

  putPerson(person, func) {}
  putUser(user, func) {}

  deletePersonById(personId, func) {}
  deleteUserById(userId, func) {}
}

export { BaseConnector }