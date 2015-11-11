var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


var paths = {
	scripts : ['./*.js', './example/*.js']
};

gulp.task('default', function() {
  // place code for your default task here
});


gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
});