const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devtool = mode === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode,
  devtool,

  devServer: {
    contentBase: resolve('dist'),
    port: 8080,
    open: true
  },

  entry: './src/index.js',
  output: {
    filename: '[hash]_bundle.js',
    path: resolve('dist')
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      'js': resolve('src/asset/js')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8192
          }
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            limit: 8192
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}