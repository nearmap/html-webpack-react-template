
module.exports = {
  plugins: [],

  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: false,
      targets: {
        node: '10'
      }
    }]
  ]
};
