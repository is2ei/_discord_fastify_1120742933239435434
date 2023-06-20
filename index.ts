import fastify from 'fastify'
import swagger from '@fastify/swagger'

const server = fastify({
  ajv: {
    customOptions: {
        strict: true,
        allErrors: true
    }
  }
})

server.register(swagger)

export const getOrgsSchema = {
    description: 'Provides all organizations',
    tags: ['Organization'],
    querystring: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 4 },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            description: 'Successful response',
            properties: {
                data: {
                    oneOf: [
                        {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    organizationContractId: { type: 'integer' },
                                    dateCreated: { type: 'string' },
                                    name: { type: 'string' },
                                },
                            },
                        },
                        {
                            type: 'object',
                            properties: {
                                organizationContractId: { type: 'integer' },
                                dateCreated: { type: 'string' },
                                name: { type: 'string' },
                            },
                        },
                    ],
                },
                rid: { type: 'string' },
            },
        },
    },
}

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get('/organization', { schema: getOrgsSchema }, async (request, reply) => {
  reply
    .code(200)
    .send({
      data: {
        organizationContractId: 12345
      },
      rid: 'hello'
    })
})

server.get('/organizations', { schema: getOrgsSchema }, async (request, reply) => {
    reply
      .code(200)
      .send({
        data: [
          {
            hello: 'world'
          }
        ],
        rid: 'hello'
      })
  })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
