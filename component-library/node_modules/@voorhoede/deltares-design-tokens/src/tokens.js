const lightColors = require('./colors-light')
const darkColors = require('./colors-dark')

const getColorTokens = (category, colors) => Object.entries(colors)
    .map(([name, value]) => ({ type: 'color', category, name, value }))

module.exports.light = {
    props: [
        ...getColorTokens('dark', darkColors)
    ]
}

module.exports.dark = {
    props: [
        ...getColorTokens('light', lightColors),
    ]
}