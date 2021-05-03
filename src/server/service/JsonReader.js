import path from 'path'
import fs from 'fs'

class JsonReader {
  #__dirname

  constructor() {
    this.#__dirname = path.resolve()
  }

  read(fileName) {
    return JSON.parse(fs.readFileSync(path.resolve(this.#__dirname, fileName)))
  }
}

export { JsonReader }