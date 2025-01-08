import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development', // 开发模式（可以根据需要切换为 production）
  entry: './src/main.ts', // Vue 3 + TypeScript 项目的入口文件
  output: {
    filename: 'js/[name].[contenthash:8].js', // 使用 contenthash 优化缓存
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 清除旧的打包文件
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'], // 支持的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 处理 TypeScript 文件
        loader: 'ts-loader', // 使用 ts-loader 编译 TypeScript 文件
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/, // 处理 Vue 文件
        loader: 'vue-loader', // 使用 vue-loader 处理 .vue 文件
      },
      {
        test: /\.css$/, // 处理 CSS 文件
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // 处理 SCSS 文件（可选）
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // Vue 3 插件，必须配置
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 提取到 css 目录，使用 contenthash 优化缓存
      chunkFilename: 'css/[id].[contenthash:8].css', // 提取公共样式时，使用 id 和 contenthash 生成独立的文件
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // 使用模板生成 HTML 文件
      filename: 'index.html',
      inject: 'body', // 将打包后的 JS 文件注入到 body 底部（提高加载性能）
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000, // 开启开发服务器的端口
    open: true, // 打包完成后自动打开浏览器
    hot: true, // 开启热重载
    historyApiFallback: true, // 对 SPA（单页面应用）友好，所有请求返回 index.html
  },
  optimization: {
    runtimeChunk: 'single', // 将 webpack runtime 提取到单独的文件，提高缓存利用率
    splitChunks: {
      chunks: 'all', // 提取公共代码并进行分割
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 将 node_modules 中的第三方库提取到单独的文件
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  cache: {
    type: 'filesystem', // 启用文件系统缓存，提高重构建速度
  },
};
