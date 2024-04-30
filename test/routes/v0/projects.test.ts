import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../../helper'

test('should get all projects', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v0/projects',
  })

  const json = JSON.parse(res.payload)
  const hasProjects = Boolean(json.projects)
  assert.equal(res.statusCode, 200)
  assert.ok(hasProjects, 'No projects returned!')

  // sub-tests
  await t.test('returns correct content type', (t) => {
    assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')
  })

  const project = json.projects[0]
  await t.test('project has expected properties', (t) => {
    assert.ok(project.id, 'No project id!')
    assert.ok(project.description, 'No project description!')
    assert.ok(project.createdAt, 'No createdAt!')
    assert.ok(project.updatedAt, 'No updatedAt!')
  })
})

test('should get project by id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v0/projects/1',
  })

  const json = JSON.parse(res.payload)
  const hasProject = Boolean(json.project)
  assert.equal(res.statusCode, 200)
  assert.ok(hasProject, 'No project returned!')
})

test('should get projects owned by id', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v0/projects/owned-by/1',
  })

  const json = JSON.parse(res.payload)
  const hasProjects = Boolean(json.projects)
  assert.equal(res.statusCode, 200)
  assert.ok(hasProjects, 'No projects returned!')
})

test('should get projects where the given user is a member', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v0/projects/with-member/1',
  })

  const json = JSON.parse(res.payload)
  const hasProjects = Boolean(json.projects)
  assert.equal(res.statusCode, 200)
  assert.ok(hasProjects, 'No projects returned!')
})

test('should fail to get projects for the given member if user does not exist', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/v0/projects/with-member/-99',
  })

  assert.equal(res.statusCode, 500)
})

test('should fail to get invalid projects path', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/v0/projects/123-impossible',
  })

  const data = JSON.parse(res.payload)
  const { project } = data

  assert.strictEqual(res.statusCode, 200)
  assert.strictEqual(project, null)
})

test('should fail to get projects for invalid user', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/v0/projects/owned-by/123-impossible',
  })

  assert.notEqual(res.statusCode, 200)
  assert.equal(res.statusCode, 500)
})
