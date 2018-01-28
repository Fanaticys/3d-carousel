const path = require('path'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    sass = require('./webpack/sass.js'),
    css = require('./webpack/css.js'),
    images = require('./webpack/images.js'),
    html = require('./webpack/html.js'),
    extractCSS = require('./webpack/extract.css'),
    uglifyJS = require('./webpack/uglify.js'),
    babel = require('./webpack/babel.js'),
    devServer = require('./webpack/devserver.js'),
    browserSync = require('./webpack/browser-sync.js'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'lib'),
    example: path.join(__dirname, 'dist')
}

// const common for development and production
const common = merge([ 
    {
        output: {
            filename: 'js/carousel-3d.js',
            libraryExport: "default",
            library: "Carousel3D",
            libraryTarget: 'umd'
        }
    },
    babel(),
    html(),
    images()
]);

const dev = {
    entry: {
        'index': PATHS.source + "/js/index.js"
    },
    output: {
        path: PATHS.example
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: PATHS.source + "/index.html"
        })
    ]
};

module.exports = function(env) {
    if(env === 'production'){
        return merge([
            common,
            {
                entry: {
                    'carousel3d.min': PATHS.source + "/js/carousel.js"
                },
                output: {
                    path: PATHS.build
                }
            },
            extractCSS(),
            uglifyJS()
        ]);
    }
    if (env === 'example') {
        return merge([
            common,
            dev,
            extractCSS(),
            uglifyJS()
        ]);
    }
    if(env === 'development'){
        return merge([
            common,
            dev,
            browserSync(),
            devServer(),
            sass(),
            css()
        ])
    }
}