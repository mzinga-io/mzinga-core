import collectionSchema from './schema'

const collectionWithHooks = (hooks: Record<string, unknown>) => ({
  slug: 'posts',
  fields: [],
  hooks,
})

describe('collection config schema', () => {
  describe('hooks.afterError', () => {
    it('accepts a function, as declared in the collection hook types', () => {
      const { error } = collectionSchema.validate(
        collectionWithHooks({ afterError: () => undefined }),
      )
      expect(error).toBeUndefined()
    })

    it('rejects a value that is not a function', () => {
      const { error } = collectionSchema.validate(
        collectionWithHooks({ afterError: [() => undefined] }),
      )
      expect(error?.details.map((detail) => detail.path.join('.'))).toContain('hooks.afterError')
    })
  })
})
