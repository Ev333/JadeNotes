var path = require('path'),
    copy = require('copy-webpack-plugin'),
    TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin,
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
    "styles": './src/webapp/styles/style.scss',
    //"lib": './src/lib/index.ts',
    "webapp": './src/webapp/main.ts'
  },
  output: {
			publicPath: publicPath,
			filename: "[name].js",
			//sourceMapFilename: "[file].map",
			path: '/'
  },
  resolve: {
    modules: ["src", "node_modules"],
    plugins: [
      new TsConfigPathsPlugin('./tsconfig.json'),
    ],
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
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /electron-app/ }
    ]
  },
  plugins: [
    new copy([
				{ from: 'src/notes/images/*', to: 'images', flatten:true },
        { from: 'node_modules/zone.js/dist/zone.js', to: 'dependencies', flatten:true },
        { from: 'node_modules/reflect-metadata/Reflect.js', to: 'dependencies', flatten:true },
        { from: 'node_modules/es6-shim/es6-shim.js', to: 'dependencies', flatten:true }
			]),    
    extractSass    
  ]
}









