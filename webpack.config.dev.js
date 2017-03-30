var path = require('path'),
    copy = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    
// var extractSass = new ExtractText({
//   disable: process.env.NODE_ENV === "development",
//   filename: "style.css",
//   publicPath: "/"
// });

const publicPath = '/public/';

const extractSass = new ExtractTextPlugin('style.css');


module.exports = {
  context: __dirname,
  entry: {
    "styles": './src/styles/style.scss',
    //"lib": './src/lib/index.ts',
    "webapp": './src/notes/main.ts'
  },
  output: {
			publicPath: publicPath,
			filename: "[name].js",
			sourceMapFilename: "[file].map",
			path: '/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", 'scss', 'css'] //, "scss", "css"
  },
  module: {
    loaders: [
      { 
        test: /\.scss$/,
					 use: extractSass.extract({
						use: [
              { loader: "css-loader" }, 
							{ loader: "sass-loader", options: {  }}
						],
					 	fallback: "style-loader"
					 })
        
      },
      { test: /fontawesome-webfont.(eot|ttf|svg|woff|woff2)/, loader: 'file-loader', options:{ name: 'fonts/[name].[hash].[ext]', flatten:true } },
      { test: /\.tsx?$/, loader: 'ts-loader', options: { configFileName: 'tsconfig-webapp.json' } }
    ]
  },
  plugins: [
    // new copy([
		// 		{ from: 'src/notes/images/*', to: 'images', flatten:true }
		// 	]),
    extractSass
  ]
}









