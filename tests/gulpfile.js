const { src, dest } = require('gulp');
const imageSanitizer = require('../src');

const images = () => src('source/*')
  .pipe(imageSanitizer([{
    maxWidth: 1280,
    suffix: '-md'
  }]))
  .pipe(dest('dest'));

module.exports.default = images;
