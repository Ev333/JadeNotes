var path = require('path'),
    copy = require('copy-webpack-plugin'),
    ExtractText = require('extract-text-webpack-plugin');
    
var extractSass = new ExtractText({
  disable: process.env.NODE_ENV === "development",
  filename: "style.css",
  publicPath: "/public"
});

module.exports = {
  context: __dirname,
  entry: {
    "styles": './src/styles/style.scss',
    "webapp": './src/notes/main.ts',
    "lib": './src/lib/index.ts'
  },
  output: {
    filename: '[name].js',
    path: '/', //path.resolve('./dist'),
    publicPath: '/public/'
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
            { loader: "sass-loader" }
          ],
          fallback: 'style-loader'
        })
      },
      { test: /fontawesome-webfont.(eot|ttf|svg|woff|woff2)/, loader: 'file-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader', options: { configFileName: 'tsconfig-webapp.json' } }
    ]
  },
  plugins: [
    new copy([
				{ from: 'src/notes/images/*', to: 'images', flatten:true }
			]),
    extractSass
  ]
}

// { 
//   context: __dirname,
//   entry: {
//     "styles": './src/styles/style.scss'
//   },
//   output: {
//     filename: '[name].css',    
//     //path: path.join(__dirname, 'build'),
//     publicPath: '/notes/styles/index.css'
//   },
//   module: {
//     loaders: [
//       { test: /\.scss$/, loader: 'sass-loader' }
//     ]
//   },
//   resolve: {
//     extensions: [".scss"]
//   }  
// }