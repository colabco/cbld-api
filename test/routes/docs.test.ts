import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper'

test('documentation endpoint loads', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/docs',
  })

  assert.equal(res.statusCode, 200)
  assert.match(res.headers['content-type'], /html/)
  assert.match(res.payload, /<title>API Reference<\/title>/)
})
