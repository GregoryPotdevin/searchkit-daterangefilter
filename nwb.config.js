module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'DateRangeFilter',
    jsNext: true,
    umd: true
  }
}
