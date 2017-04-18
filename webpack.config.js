const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: {
    app: PATHS.app,
  },
  node: {
    fs: 'empty',
  },
  output: {
    path: PATHS.dist,
    library: 'PostcssTypescriptCss',
    filename: 'postcss-typescript-css.js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: PATHS.app,
        exclude: /node_modules/,
        options: {
          tsConfigFile: 'tsconfig.json',
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: PATHS.app,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([PATHS.dist]),
    new BabiliPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_console: true
      }
    }),
  ],
}
