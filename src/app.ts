import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify'

// PLACEHOLDER TODO: application context
// declare module 'fastify' {
//   interface FastifyInstance {
//     config: {
//       DATABASE_URL: string
//     }
//   }
// }

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!
  const apiSpecs = join(__dirname, 'api-specs')
  const yamlSpec = join(apiSpecs, 'temp-projects.yaml')

  // see: https://github.com/fastify/fastify-swagger#static
  void fastify.register(require('@fastify/swagger'), {
    info: {
      title: 'Cobuilders API',
      description: 'Swagger API docs for the Cobuilders API',
      version: '0.1',
    },
    mode: 'static',
    specification: {
      path: yamlSpec,
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    exposeRoute: true,
  })

  void fastify.register(require('@scalar/fastify-api-reference'), {
    routePrefix: '/docs',
    configuration: {
      spec: () => (fastify as any).swagger(),
    },
  })

  void fastify.setNotFoundHandler((_request, reply) => {
    reply.code(404).type('text/html').send('Not Found')
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })
}

export default app
export { app, options }
