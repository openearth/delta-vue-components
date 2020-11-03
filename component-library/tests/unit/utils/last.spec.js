import last from '../../../src/utils/last'

describe('last', () => {
  it('returns the last item of an array', () => {
    const array = ['1', '2', '3', '4']
    const lastItem = last(array)
    expect(lastItem).toBe('4')
  })

  it('returns undefined when not found', () => {
    const array = []
    const lastItem = last(array)
    expect(lastItem).toBe(undefined)
  })

  it('returns undefined when no array is provided', () => {
    const lastItem = last()
    expect(lastItem).toBe(undefined)
  })

  it('returns undefined when a non Array type is provided', () => {
    const lastItem = last({foo: 'bar'})
    expect(lastItem).toBe(undefined)
  })
})