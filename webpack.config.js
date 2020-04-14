const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (_env) {
    const isDevelopment = _env === 'development';
    const isSimulator = _env === 'simulator';

    return {
        devtool: (isDevelopment || isSimulator) && 'eval-source-map',
        entry: './app-core/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, isSimulator ? 'app-simulator' : 'app-package')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'app-simulator'),
            compress: true,
            port: 5000
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    (isDevelopment || isSimulator) ? 'development' : 'production'
                )
            }),
            new CopyPlugin([
                {
                    from: './app-core/assets',
                    to: 'assets'
                }
            ])
        ]
    }
};