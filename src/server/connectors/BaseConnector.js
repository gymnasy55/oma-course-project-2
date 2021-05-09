class BaseConnector {
  getAllPersons() {}
  getPersons() {}
  getPersonsByUserId(userId) {}
  getDeletedPersonsByUserId(userId) {}

  postPerson(person) {}

  putPerson(person) {}

  deletePersonById(personId) {}
}

export { BaseConnector }