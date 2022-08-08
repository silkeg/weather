const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  const mode = argv ? argv.mode : '';

  return {
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    entry: {
      main: `${__dirname}/src/js/main.js`,
    },
    output: {
      path: `${__dirname}/dist/js`,
      filename: `[name].build.js`,
    },
    resolve: {
      extensions: ['', '.js'],
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env'],
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
  };
};
