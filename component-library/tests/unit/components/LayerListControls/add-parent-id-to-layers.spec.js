import addParentIdToLayers from '../../../../src/components/LayerListControls/add-parent-id-to-layers'

describe('addParentIdToLayers', () => {
  it('adds parent ids to the layers', () => {
    const layers = [
      { id: '0', name: 'Group 0', children: [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a' },
        { id: 'b', name: 'Group B', children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d' },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e' },
          { id: 'f', name: 'Group F', children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g' },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c' },
      ] }
    ]
    const expectedResult = [
      { id: '0', name: 'Group 0', parentIds: [], children: [
        { id: 'a', name: 'Layer A', layer: 'a', url: 'url://a', parentIds: ['0'] },
        { id: 'b', name: 'Group B', parentIds: ['0'], children: [
          { id: 'd', name: 'Layer D', layer: 'd', url: 'url://d', parentIds: ['0', 'b'] },
          { id: 'e', name: 'Layer E', layer: 'e', url: 'url://e', parentIds: ['0', 'b'] },
          { id: 'f', name: 'Group F', parentIds: ['0', 'b'], children: [
            { id: 'g', name: 'Layer G', layer: 'g', url: 'url://g', parentIds: ['0', 'b', 'f'] },
          ] },
        ] },
        { id: 'c', name: 'Layer C', layer: 'c', url: 'url://c', parentIds: ['0'] },
      ] }
    ]
    const result = addParentIdToLayers(layers)
    expect(result).toEqual(expectedResult)
  })
})