import addIndex from '../../../../lib/components/LayerListControls/add-index'

describe('addIndex', () => {
  it('adds an index to all layers', () => {
    const layers = [
      { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
      { id: 'b', name: 'Layer B', layer: 'b', url: 'url://b' },
      { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
    ]
    const expectedResult = [
      { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a', index: 2 },
      { id: 'b', name: 'Layer B', layer: 'b', url: 'url://b', index: 1 },
      { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c', index: 0 },
    ]
    const result = addIndex(layers)
    expect(result).toEqual(expectedResult)
  })

  it('handles nested layers', () => {
    const layers = [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
        { id: 'b', name: 'Group B', children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e' },
          { id: 'f', name: 'Group F', children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g' },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
    ]
    const expectedResult = [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a', index: 4 },
        { id: 'b', name: 'Group B', children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d', index: 3 },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e', index: 2 },
          { id: 'f', name: 'Group F', children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g', index: 1 },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c', index: 0 },
    ]
    const result = addIndex(layers)
    expect(result).toEqual(expectedResult)
  })
})