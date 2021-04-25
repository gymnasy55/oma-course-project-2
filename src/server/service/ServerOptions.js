class ServerOptions {
  constructor(method, url) {
    this.method = method.toUpperCase()
    this.url = url
  }
}

export { ServerOptions }