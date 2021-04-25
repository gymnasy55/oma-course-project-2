class RouteOptions {
  constructor(method, url) {
    this.method = method.toUpperCase()
    this.url = url
  }
}

export { RouteOptions }