// Module configuration

// Paths
const paths = new (function paths() {
  this.app = 'app/';
  this.dist = 'dist/';
  this.templates = 'templates/**/*';
  this.js = `${this.app}js/`;
  this.scss = `${this.app}scss/**/*.scss`;
  this.tmp = '.tmp/';
});


// Configuration
const browsers = [
  '> 5%',
  'ie > 0',
  'Firefox > 0',
  'Chrome > 0',
  'Opera > 0',
  'OperaMobile > 0',
  'OperaMini > 0',
  'Safari > 0',
  'iOS > 0',
  'Blackberry > 0',
  'Android > 0',
];

const autoprefixer = { browsers };

const browserSync = {
  notify: false,
  proxy: 'http://localhost:8080',
};

const nodemon = {
  ext: 'js nunjucks',
  script: 'index.js',
};

const webpack = {
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

module.exports = {
  paths,
  autoprefixer,
  browserSync,
  nodemon,
  webpack,
};
