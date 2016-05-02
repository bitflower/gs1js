var gulp        = require("gulp"),
    // browserify  = require("browserify"),
    // source      = require("vinyl-source-stream"),
    // buffer      = require("vinyl-buffer"),
    //tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript");
    //sourcemaps  = require("gulp-sourcemaps");
    // uglify      = require("gulp-uglify"),
    // runSequence = require("run-sequence"),
    // mocha       = require("gulp-mocha"),
    // istanbul    = require("gulp-istanbul"),
    // browserSync = require('browser-sync').create();
    
    
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build", function() {
    return gulp.src([
            "src/**/**.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("dist/"));
});