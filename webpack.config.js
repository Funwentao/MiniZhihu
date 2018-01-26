const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        "login":'./src/js/containers/LoginContainer.js',
        "index":'./src/js/containers/IndexContainer.js'
    },
    output: {
        path: __dirname+"/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015','stage-0'],
                        plugins: [['import', {"libraryName": "antd-mobile", "style": "css"}]]
                    }
                }
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test:/\.svg/,
                loaders: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '登录注册',
            filename: './html/login.html',
            template: './template.html',
            chunks:['login']
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            filename: './html/index.html',
            template: './template.html',
            chunks:['index']
        }),
        //new ExtractTextPlugin('[name].css')
    ]
}
