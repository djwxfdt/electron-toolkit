var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    name: 'js',
    entry: {
        'index': './app/src/js/index.js'
    },
    output: {
        path: path.join(__dirname, "app", "dist"),
        filename: '[name].js',
        publicPath:'dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx','less']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/

            }, {
                test: /\.less$/,
                use: [ {
                    loader:"style-loader"
                },{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};
