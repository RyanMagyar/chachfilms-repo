const path = require('path');

module.exports = {
  mode: 'development',
  entry: './chachapp/js/index.jsx',
  output: {
    path: path.join(__dirname, '/chachapp/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: 'babel-loader',
        
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
