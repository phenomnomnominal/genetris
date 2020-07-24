const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.ts'
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, './src/index.ejs'),
        'utf8'
      )
    })
  ],

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.worker\.ts$/i,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/, /\.scss/]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss']
  }
};
