const path = require("path");
const webpack = require("webpack");
const banner = require("./banner");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/app.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist")
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader   // 운영 환경
                    : "style-loader", "css-loader"  // 개발 환경
            ]
        }, {
            test: /\.png$/,
            loader: "url-loader",              // file-loader를 url-loader로 변경
            options: {
                publicPath: "./dist/",
                name: "[name].[ext]?[hash]",   // 기본 옵션 동일 
                limit: 5000000                // limit값(kb) 미만 크기의 파일을 data url로 처리
            }
        }]
    },
    plugins: [
        ...(process.env.NODE_ENV === "production"
            ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
            : []),
        new webpack.BannerPlugin(banner),
        new webpack.DefinePlugin({ "api.domain": JSON.stringify("http://dev.api.domain.com") }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",                        // 템플릿 파일 경로 지정
            templateParameters: { env: process.env.NODE_ENV },   // 템플릿에 전달할 파라미터 변수 지정 
            minify: process.env.NODE_ENV === "production" ?
                {
                    collapseWhitespace: true,   // 공백 제거
                    removeComments: true        // 주석 제거
                } : false
        })
    ]
}

