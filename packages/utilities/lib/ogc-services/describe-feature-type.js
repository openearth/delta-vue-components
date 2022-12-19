import buildGeoserverUrl from '../mapbox/build-geoserver-url'

export default async function describeFeatureType({ url, layer }) {
  const geoServerUrl = await buildGeoserverUrl({
    url,
    request: 'describeFeatureType',
    service: 'WFS',
    outputFormat: 'application/json',
    typenames: layer,
  })

  return fetch(geoServerUrl)
    .then(response => response.json())
    .catch(() => undefined)
}