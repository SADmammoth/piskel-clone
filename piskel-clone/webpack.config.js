const HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(otf|png|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            interpolation: false
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ hash: true, template: './src/screens/canvas/index.html' })],
    target: 'node-webkit',
    externals: [nodeExternals()],
};
