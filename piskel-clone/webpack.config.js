const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    path: __dirname + '/dist',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(otf|png|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(html)$/,
        use: [
          'html-loader'
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/screens/canvas/index.html' })],
}
