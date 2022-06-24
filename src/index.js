const { Transform } = require("stream");
const sharp = require("sharp");
const PluginError = require("plugin-error");
const log = require("log-update");

const pluginName = "gulp-image-sanitizer";
const supportedFormats = [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".raw"];

module.exports = (versions = []) =>
  new Transform({
    objectMode: true,
    async transform(file, _encoding, done) {
      if (file.isNull() || versions.length === 0) {
        return done(null, file);
      }

      if (!supportedFormats.includes(file.extname.toLowerCase())) {
        return this.emit(
          "error",
          new PluginError(pluginName, `Can't resize ${file.extname} files!`)
        );
      }

      const sharpImage = sharp(file.contents);
      const metadata = await sharpImage.metadata();

      const promises = versions.map(
        async ({ width, height, fit, position, suffix, force }) => {
          const clonedVinyl = file.clone();
          const clonedSharpImage = sharpImage.clone();
          suffix = suffix || "";

          if (
            !force &&
            (metadata.width >= width || metadata.height >= height)
          ) {
            try {
              clonedVinyl.extname = suffix + clonedVinyl.extname;
              clonedVinyl.contents = await clonedSharpImage
                .resize({
                  width,
                  height,
                  fit,
                  position,
                })
                .toBuffer();
            } catch (error) {
              return this.emit("error", new PluginError(pluginName, error));
            }
          }

          log(`${pluginName}: created ${clonedVinyl.relative}`);
          return this.push(clonedVinyl);
        }
      );

      await Promise.all(promises);

      return done();
    },
  });
