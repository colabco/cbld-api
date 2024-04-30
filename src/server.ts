import 'dotenv/config'
import fastify from 'fastify'
import app from './app'

const server = fastify({
  logger: true,
})

// Register the api application (it is basically a plugin)
server.register(app)

// Start listening.
server.listen(
  {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT as string) || 3000,
  },
  err => {
    if (err) {
      console.log('an error has occurred:', err)
      process.exit(1)
    }
  }
)
