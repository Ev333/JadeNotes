

module.exports = {
 entry: './src/ElectronMain.js',
 output: {
   filename: 'electron-app.js',
   path: './build'
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
};