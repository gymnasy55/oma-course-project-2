import express, {Router} from 'express'

class Server {
  #app
  #PORT
  #router

  constructor() {
    this.#app = express()
    this.#PORT = 8080
    this.#router = Router()
  }

  addRoute(options, callback) {
    switch (options.method.toUpperCase()) {
      case 'GET':
        this.#router.get(`/api/${options.url}`, callback)
        break
      case 'POST':
        this.#router.post(`/api/${options.url}`, callback)
        break
      case 'DELETE':
        this.#router.delete(`/api/${options.url}`, callback)
        break
    }
  }

  serve() {
    this.#app.use(this.#router)

    this.#app.listen(this.#PORT, () => {
      console.log(`Server has been started on ${this.#PORT}...`)
    })
  }
}

export {Server}