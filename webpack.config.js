const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //
  devServer: {
    port: 3000,
  },
  //
  resolve: {
    extensions: ['.js', '.ts'],
  },
  //
  module: {
    rules: [
      {
        test: /\.ts/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  //
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      title: 'Excalibur JS',
    }),
  ],
}
