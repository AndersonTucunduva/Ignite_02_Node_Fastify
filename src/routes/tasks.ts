import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function tasksRouts(app: FastifyInstance) {
  app.get(
    '/',

    async () => {
      const tasks = await knex('tasks').select().where({
        completed: false,
      })

      return tasks
    },
  )

  app.post('/', async (request, replay) => {
    const createTransactionBodySchema = z.object({
      task: z.string(),
    })

    const { task } = createTransactionBodySchema.parse(request.body)

    await knex('tasks').insert({
      id: randomUUID(),
      task,
    })

    return replay.status(201).send()
  })

  app.get(
    '/:id',

    async (request) => {
      const getTasksParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTasksParamsSchema.parse(request.params)

      const task = await knex('tasks')
        .where({
          id,
        })
        .first()

      return task
    },
  )

  app.delete(
    '/:id',

    async (request) => {
      const getTasksParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTasksParamsSchema.parse(request.params)

      const task = await knex('tasks')
        .where({
          id,
        })
        .del()

      return task
    },
  )

  app.put(
    '/:id',

    async (request) => {
      const getTasksParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTasksParamsSchema.parse(request.params)

      const task = await knex('tasks')
        .update({
          completed: true,
        })
        .where({
          id,
        })

      return task
    },
  )
}
