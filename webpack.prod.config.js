const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/,/what_ever/]
            },

            {

                test: /\.vue$/,
                use: {
                    loader:'vue-loader'
                }
            },
            {
                test:/\.(c|le)ss$/,
                use: [
                	{
            			loader: MiniCssExtractPlugin.loader,
          			},{
                        loader:'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:[
                        "@babel/preset-env"
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }     
                },

                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },


            {
                test: /\.(png|svg|jpg|gif|webp)$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 20000
                    }
                }
            },

            {
                test: /\.(eof|woff|woff2|ttf)$/,
                use:{
                    loader: 'url-loader',
                    options: {
                        limit: 20000
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: "index.html"
        }),
        new VueLoaderPlugin(),
        new StyleLintPlugin({
          files: ['./src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        }),
        new MiniCssExtractPlugin({
          filename: './[name].css',
    })
    ]
};