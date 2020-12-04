const path = require("path");
const webpack = require("webpack");
const banner = require("./banner.js");

module.exports = {
    mode: "development",
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
            use: ["style-loader", "css-loader"]
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
        new webpack.BannerPlugin(banner)
    ]
}