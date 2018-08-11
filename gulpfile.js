var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    markdown = require('markdown'),
    fileInclude = require('gulp-file-include');

gulp.task('fileInclude', function() {
    gulp.src(['app/template/index.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(gulp.dest('./app/'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: true
    })
});

gulp.task('watch', ['fileInclude', 'browser-sync'], function () {
    gulp.watch('app/css/*.css', browserSync.reload);
    gulp.watch('app/template/**/*.css', browserSync.reload);
    gulp.watch('app/template/**/*.html', ['fileInclude'], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);


