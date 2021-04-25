import express, { Router } from 'express'
import { logger } from './middlewares/logger.js';

class Server {
  #app
  #PORT
  #router

  constructor(PORT) {
    this.#PORT = PORT || 8080
    this.#app = express()
    this.#router = Router()
  }

  addRoute(options, func) {
    switch (options.method) {
      case 'GET':
        this.#router.get(`/api/${options.url}`, func)
        break
      case 'POST':
        this.#router.post(`/api/${options.url}`, func)
        break
      case 'DELETE':
        this.#router.delete(`/api/${options.url}`, func)
        break
    }
  }

  serve(func) {
    this.#app.use(express.json())
    this.#app.use(express.urlencoded({ extended: true }))
    this.#app.use(logger)
    this.#app.use(this.#router)
    this.#app.listen(this.#PORT, func)
  }
}

export { Server }