const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('nodemon');

    // Nodemon task:
  // Start nodemon once and execute callback (browser-sync)
  gulp.task('nodemon', cb => {
    let started = false;
    return nodemon({
      script: 'index.js'
    }).on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    });
  });
  // BrowserSync task:
  // calls nodemon tasks and pass itself as callback
  gulp.task(
    'browser-sync',
    gulp.series('nodemon', () => {
      browserSync.init(null, {
        proxy: 'http://localhost:8000',
        files: ['public/**/*.*', 'templates/'],
        port: 5000
      });
    })
  );

  gulp.task('default', gulp.parallel('browser-sync'));