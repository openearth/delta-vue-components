import moveInArray from '../../../src/utils/move-in-array'

describe('moveInArray', () => {
  it('moves an item in the array to a new index', () => {
    const array = ['1', '2', '3', '4']
    const lastItem = moveInArray(array, 1, 3)
    expect(lastItem).toEqual(['1', '3', '4', '2'])
  })

  it('throws when it could not locate the item to be moved', () => {
    expect(() => {
      moveInArray(['1', '2', '3', '4'], 4, 3)
    }).toThrow(ReferenceError)
  })

  it('throws when the newIndex lies outside of the array bounds', () => {
    expect(() => {
      moveInArray(['1', '2', '3', '4'], 1, 5)
    }).toThrow(RangeError)
  })
})