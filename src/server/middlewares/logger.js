import colors from 'colors'

export const logger = (req, res, next) => {
  switch (req.method) {
    case 'GET':
        console.log(colors.bgBlack(`${colors.green('[GET]')} [${req.path}] [${req.ip}]`))
      break
    case 'POST':
      console.log(colors.bgBlack(`${colors.yellow('[POST]')} [${req.path}] [${req.ip}]`))
      break
    case 'DELETE':
      console.log(colors.bgBlack(`${colors.red('[DELETE]')} [${req.path}] [${req.ip}]`))
      break
    case 'PUT':
      console.log(colors.bgBlack(`${colors.blue('[PUT]')} [${req.path}] [${req.ip}]`))
      break
  }

  next()
}