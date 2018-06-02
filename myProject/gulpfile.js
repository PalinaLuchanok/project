var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('lib-css-min', function () {
    return gulp.src([
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('lib.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'));
});

gulp.task('lib-js-min', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/tooltip.js/dist/umd/tooltip.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js-min', function () {
    return gulp.src('app/js/project.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'));
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app',
            index: 'project.html'
        },
        notify: false
    })
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('img', function () {
    return gulp.src('app/images/**/*')
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', ['browser-sync', 'lib-css-min', 'css-min', 'lib-js-min', 'js-min'], function () {
    gulp.watch('app/sass/**/*.scss', ['css-min', browserSync.reload]);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/project.js', ['js-min', browserSync.reload]);
});

gulp.task('build', ['clean', 'img', 'lib-css-min', 'css-min', 'lib-js-min', 'js-min'], function () {
    var buildCss = gulp.src('app/css/**/*.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('app/js/**/*.min.js')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['watch']);