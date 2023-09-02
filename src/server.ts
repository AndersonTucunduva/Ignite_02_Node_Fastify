import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
import { tasksRouts } from './routes/tasks'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors)
app.register(tasksRouts, {
  prefix: 'tasks',
})
app.register(cookie)
app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
