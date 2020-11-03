import reorderLayersArray from '../../../../src/components/LayerListControls/reorder-layers-array'

describe('reorderLayersArray', () => {
  it('reorders layers in an array', () => {
    const layers = [
      { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
      { id: 'b', name: 'Layer B', layer: 'b', url: 'url://b' },
      { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
    ]
    const expectedResult = [
      { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
      { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      { id: 'b', name: 'Layer B', layer: 'b', url: 'url://b' },
      { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
    ]
    const result = reorderLayersArray(layers, [], 1, 2)
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
    const expectedResult = [
      { id: '0', name: 'Group 0', children: [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
        { id: 'b', name: 'Group B', children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e' },
          { id: 'f', name: 'Group F', children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g' },
            { id: 'i', name: 'Layer I', layer: 'i', url: 'url://i' },
            { id: 'h', name: 'Layer H', layer: 'h', url: 'url://h' },
            { id: 'j', name: 'Layer J', layer: 'j', url: 'url://j' },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      ] }
    ]
    const result = reorderLayersArray(layers, ['0', 'b', 'f'], 1, 2)
    expect(result).toEqual(expectedResult)
  })
})