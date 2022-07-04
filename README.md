  # gulp-image-sanitizer

  [![latest version on npm](https://img.shields.io/npm/v/gulp-image-sanitizer)](https://www.npmjs.com/package/gulp-image-sanitizer)

  ## Setup

  ```sh
  npm install --save-dev gulp-image-sanitizer
  ```

  ```js
  const { src, dest } = require("gulp");
  const imageSanitizer = require("gulp-image-sanitizer");

  const images = () =>
    src("source/img/*")
      .pipe(
        imageSanitizer([
          {
            width: 640,
          },
        ])
      )
      .pipe(dest("public/img"));

  module.exports.images = images;
  ```

  ## Config

  ### `width`

  Type: `number`<br>
  Default: `undefined`

  Desired width of the image in pixels.

  ### `height`

  Type: `number`<br>
  Default: `undefined`

  Desired height of the image in pixels.

  ### `maxWidth`

  Type: `number`<br>
  Default: `undefined`

    Desired max width of the image in pixels. Smaller images are keep untouched.

  ### `maxHeight`

  Type: `number`<br>
  Default: `undefined`

  Desired max height of the image in pixels. Smaller images are keep untouched.

  ### `fit`

  Type: `string`<br>
  Default: `'cover'`

  How the image should fit inside the specified dimensions.

  ### `position`

  Type: `string`<br>
  Default: `'center'`

  What or where to focus on when cropping is necessary.

  ### `suffix`

  Type: `string`<br>
  Default: `undefined`

  String to prepend the file extension.
