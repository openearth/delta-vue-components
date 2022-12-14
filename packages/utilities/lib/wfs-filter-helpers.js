/*
  Function that reads the DescribeFeatureType response and returns the available attributes to filter and their type
  excludes geom
*/
export function readFeatureProperties(describeFeatureTypeResponse) {

  const { featureTypes } = describeFeatureTypeResponse
  const properties = featureTypes[0].properties

  const filteredProperties = properties.filter((property) =>
    property.type.includes('xsd')).map(({ name, type }) => {
      return { name, type }
    })
  return filteredProperties
}