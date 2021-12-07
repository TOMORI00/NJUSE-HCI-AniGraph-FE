const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackBar = require("webpackbar");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = {
    configureWebpack: smp.wrap({
        plugins: [
            // 进度条
            new WebpackBar(),
            // 资源大小评估
            new BundleAnalyzerPlugin(),
        ],
    })
}