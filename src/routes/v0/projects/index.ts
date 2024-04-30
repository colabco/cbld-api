import fs from 'fs'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FastifyPluginAsync } from 'fastify'

import type { ReqByProjectId, ReqByUserId, ResProject, ResProjectList, SampleData } from './types.ts'
const data: SampleData = JSON.parse(fs.readFileSync('src/data/sample.json', 'utf8'))

const getProjects = async (_req: FastifyRequest, _resp: FastifyReply): Promise<ResProjectList> => {
  return { projects: data.projects || [] }
}

const getProjectById = async (req: FastifyRequest<ReqByProjectId>, _resp: FastifyReply): Promise<ResProject> => {
  const { projectId } = req.params
  const project = data.projects.find((project) => project.id === projectId) || null
  return { project }
}

const getProjectsOwnedByUser = async (req: FastifyRequest<ReqByUserId>, _resp: FastifyReply): Promise<ResProjectList> => {
  const { userId } = req.params
  const targetUser = data.users.find((user) => user.id === userId)
  if (!targetUser) {
    throw new Error('User not found')
  }
  const projects = data.projects.filter((project) => targetUser.projectsOwned.includes(project.id)) || []
  return { projects }
}

const getProjectsWithMember = async (req: FastifyRequest<ReqByUserId>, _resp: FastifyReply): Promise<ResProjectList> => {
  const { userId } = req.params
  const targetUser = data.users.find((user) => user.id === userId)
  if (!targetUser) {
    throw new Error('User not found')
  }
  const projects = data.projects.filter((project) => targetUser.isMemberOfProjects.includes(project.id)) || []
  return { projects }
}

const projectsPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', getProjects)
  fastify.get('/owned-by/:userId', getProjectsOwnedByUser)
  fastify.get('/with-member/:userId', getProjectsWithMember)
  fastify.get('/:projectId', getProjectById)
}

export default projectsPlugin
