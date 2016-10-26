// Module configuration

// Paths
const imageExtensions = [
  'gif',
  'jpg',
  'png',
  'svg',
];

const paths = new (function() {
  this.app = 'app/';
  this.distDir = 'dist/';

  this.extras = {
    favicon: '*.ico',
    fonts: 'fonts/**',
    images: '**/*.{' + imageExtensions + '}',
  };

  this.html = this.app + '**/*.html';
  this.js = this.app + 'js/';
  this.scss = this.app + 'scss/**/*.scss';
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

const htmlmin = {
  collapseWhitespace: true,
  removeComments: true,
};

const imagemin = {
  interlaced: true,
  progressive: true,
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
  htmlmin,
  imagemin,
  nodemon,
  webpack,
};
