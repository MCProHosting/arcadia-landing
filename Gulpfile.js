var gulp         = require('gulp'),
    glob         = require('glob'),
    isProduction = false,
    $            = require('gulp-load-plugins')();

var globs = {
    css: 'src/css/**/*.less',
    js: 'src/js/**/*.{js,coffee}',
    html: 'src/*.html',
    images: 'src/img/**',
    misc: 'src/**/*.{ico,eot,woff,ttf,php}'
};

gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe($.autoprefixer('last 3 versions'))
        .pipe($.if(isProduction, $.minifyCss()))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function () {
    gulp.src(globs.js)
        .pipe($.coffee())
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('html', function() {
    gulp.src(globs.html)
        .pipe($.if(isProduction, $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});
gulp.task('images', function() {
    gulp.src(globs.images)
        .pipe($.if(isProduction, $.imagemin({
            progressive: true
        })))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('misc', function () {
    gulp.src(globs.misc).pipe(gulp.dest('dist'));
});

gulp.task('setProduction', function() {
    isProduction = true;
});

gulp.task('dist', ['setProduction', 'default']);
gulp.task('default', ['html', 'js', 'css', 'images', 'misc']);
