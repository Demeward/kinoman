const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
