var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var WriteFilePlugin = require('write-file-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var ip = require('ip')

var local_ip = ip.address()

function augmentConfig (config) {
  if (process.env.NODE_ENV !== 'production') {
    config.entry.app.unshift('webpack-dev-server/client?http://'+local_ip+':8088')
    config.entry.app.unshift('react-hot-loader/patch')
    config.entry.app.push('webpack/hot/only-dev-server')
    config.module.loaders[0].options = { plugins: ['react-hot-loader/babel'] }
    config.devServer = {
      host: local_ip,
      inline: true,
      hot: true,
      port: 8088,
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
    config.output.publicPath = 'http://'+local_ip+':8088/'
    config.plugins.push(new WriteFilePlugin({log: false}))

    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new webpack.NamedModulesPlugin())
  }
  return config
}

module.exports = augmentConfig({
  entry: {
    app: [ './src/index.js' ]
  },
  output: {
    path: path.resolve(__dirname, './output'),
    filename: 'assets/[name].js',
    sourceMapFilename: 'assets/[name].js.map',
    chunkFilename: 'assets/[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader'] })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?prefix=img/&limit=5000&name=output/imgs/[hash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff&name=output/fonts/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|pdf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=output/files/[hash].[ext]'
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
