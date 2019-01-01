const path = require('path');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config;

class GASWebWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tapAsync(
            'AfterHookWebpackPlugin',
            (stats, callback) => {
                const src = path.join(config.output.path, config.output.filename);
                const dest = src + '.html';

                if (!fs.existsSync(src)) return callback();

                let contents = fs.readFileSync(src, 'utf-8');
                contents = '<script>\n' + contents + '\n</script>';
                fs.writeFileSync(dest, contents, 'utf-8');

                fs.unlinkSync(src);

                callback();
            }
        );
    }
}

config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin(
            [
                'appsscript.json',
                'index.html',
                'Code.js'
            ].map(file => ({
                from: path.resolve(__dirname, `./src/${file}`),
                to: path.resolve(__dirname, `./dist/${file}`)
            }))
        ),
        new GASWebWebpackPlugin()
    ],
};

module.exports = config;