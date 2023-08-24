import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  src: path.resolve(__dirname, '_src'),
  build: path.resolve(__dirname, '_build'),
};

export const webpackConfig = (isMode) => {
  return {
    entry: {
      app: `${paths.src}/JS/app.js`,
      admin: `${paths.src}/JS/admin.js`
    },


    mode: isMode ? 'development' : 'production',

    output: {
      path: path.join(paths.build, 'JS'),
      filename: '[name].js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },

          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
  };
};
