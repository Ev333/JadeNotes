module.exports = {
 entry: './src/ElectronMain.js',
 output: {
   filename: 'devserver.js',
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
 }
};