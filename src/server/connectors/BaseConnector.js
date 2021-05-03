class BaseConnector {
  getAllPersons(func) {}
  getPersons(func) {}
  getPersonsByUserId(userId, func) {}
  getDeletedPersonsByUserId(userId, func) {}

  postPerson(person, func) {}

  putPerson(person, func) {}

  deletePersonById(personId, func) {}
}

export { BaseConnector }