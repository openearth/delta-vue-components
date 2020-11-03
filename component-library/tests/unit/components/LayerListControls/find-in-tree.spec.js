import findInTree from '../../../../src/components/LayerListControls/find-in-tree'

describe('findInTree', () => {
  it('Finds an item based on the id', () => {
    const layers = [
      { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
      { id: 'b', name: 'Layer B', layer: 'b', url: 'url://b' },
      { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
    ]
    const expectedResult = { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' }
    const result = findInTree(layers, 'id', 'c')
    expect(result).toEqual(expectedResult)
  })

  it('Handles nested layers as well', () => {
    const layers = [
      { id: '0', name: 'Group 0', children: [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
        { id: 'b', name: 'Group B', children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e' },
          { id: 'f', name: 'Group F', children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g' },
            { id: 'h', name: 'Layer H', layer: 'h', url: 'url://h' },
            { id: 'i', name: 'Layer I', layer: 'i', url: 'url://i' },
            { id: 'j', name: 'Layer J', layer: 'j', url: 'url://j' },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      ] }
    ]
    const expectedResult = { id: 'i', name: 'Layer I', layer: 'i', url: 'url://i' }
    const result = findInTree(layers, 'id', 'i')
    expect(result).toEqual(expectedResult)
  })
})