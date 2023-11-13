const path = require('path');
// const BytenodeWebpackPlugin = require("bytenode-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname),
        // path: path.join(__dirname, "build"),
        filename: 'elumutu.js',
        libraryTarget: 'var',
        library: 'app'
    }
    //   ,  plugins: [new BytenodeWebpackPlugin()],
};
