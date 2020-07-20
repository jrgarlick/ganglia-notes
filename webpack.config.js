const path = require('path');
module.exports = {
  entry: [
    './source/app.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { 
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

      // {
      //   test: /(\.ts|\.tsx)$/, 
      //   loaders: ["ts-loader"],
      //   include: [path.join(__dirname, "source"), path.join(__dirname, "data")] 
      // },