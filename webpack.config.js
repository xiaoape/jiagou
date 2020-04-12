// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const ENV = process.env.NODE_ENV

const port = 8870

const resolve = {
    extensions: ['.js', '.css', '.scss', '.less', '.json'],
    alias: {
        '@': path.resolve(__dirname, 'src/')
    }
}
const cssRule = {
    loader: 'css-loader',
    options: {
        // 启用import
        import: true,
        // 启用css modules
        // modules: true,
        // 启用sourceMap
        soucreMap: true,
        // 配置生成的标识符(ident)
        localIdentName: '[name]-[local]-[hash:base64:8]',
        // 在 css-loader 前应用的 loader 的数量
        importLoaders: 1
    }
}

const ComConfig = {
    mode: ENV,
    entry: ["@babel/polyfill", path.resolve(__dirname, './src/index.js')],    // 入口文件
    output: {
        filename: '[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname, 'dist')  // 打包后的目录
    },
    resolve,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "[name].[hash].css",
        //     chunkFilename: "[id].css",
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader', cssRule] // 从右向左解析原则
            },
            // 这里的less配置错误，不知道为什么，可能是MiniCssExtractPlugin.loader有问题
            {
                test: /\.less$/,
                use: ['style-loader',cssRule, {
                    loader:  'less-loader',
                    options: {
                        // 可以在less样式使用带参mixin,如果不加，使用antd的时候，这里是会报错的
                        javascriptEnabled: true
                    }
                }]
                    // 从右向左解析原则 
                    // loader: 'postcss-loader',
                    // options: {
                    //     plugins: [require('autoprefixer')]
                    // }
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    // babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等),使用babel-polyfill
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
}

const devServer = {
    host: 'localhost',
    port,
    open: true,  // 自动在浏览器中打开
    hot: true, // 开启热更新
    // hotOnly: true,
    inline: true,
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要
    contentBase: path.resolve(__dirname, 'dist'),
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,
    proxy: {
        '/proxy/*': {
            target: 'https://alpha-dayu.aidigger.com',
            pathRewrite: {
                '/proxy': '/api'
            },
            // 允许接口跨域
            changeOrigin: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                withCredentials: true,
                cookie: 'code=598001; skey=YQA5S0nQGLaBA/Zg3EfuZiBgSBsz2MGc',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Aceept, Connection, User-Agent, Cookie'
            }
        }
    }
}
// 区分生产和开发环境
if (ENV === 'production') {
    module.exports = merge.strategy({
        'module.rules': 'replace'
    })(ComConfig, {
        devtool: 'source-map',
        stats: 'errors-only',
    })
 } else {
    module.exports = merge(ComConfig, {
        devtool: 'eval-source-map',
        watchOptions: {
            aggregateTimeout: 500,
            // poll: 1000,
            ignored: /node_modules/
        },
        devServer
    })
}

