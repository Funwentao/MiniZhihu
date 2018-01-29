const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        "login":'./src/js/containers/LoginContainer.js',
        "index":'./src/js/containers/IndexContainer.js',
        "like":'./src/js/containers/LikeContainer.js',
        "collection":'./src/js/containers/CollectionContainer.js',
        "my":'./src/js/containers/MyContainer.js',
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
                loaders: "svg-sprite-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '登录注册',
            filename: '../view/login.html',
            template: './template.html',
            chunks:['login']
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            filename: '../view/index.html',
            template: './template.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            title: '关注',
            filename: '../view/like.html',
            template: './template.html',
            chunks:['like']
        }),
        new HtmlWebpackPlugin({
            title: '收藏',
            filename: '../view/collection.html',
            template: './template.html',
            chunks:['collection']
        }),
        new HtmlWebpackPlugin({
            title: '我的',
            filename: '../view/my.html',
            template: './template.html',
            chunks:['my']
        })

        //new ExtractTextPlugin('[name].css')
    ]
}
