var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    //tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify");
    // runSequence = require("run-sequence"),
    // mocha       = require("gulp-mocha"),
    // istanbul    = require("gulp-istanbul"),
    // browserSync = require('browser-sync').create();
    
    
var tsProject = tsc.createProject("tsconfig.json");

// Build Typescript
gulp.task("build", function() {
    return gulp.src([
            "src/**/**.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("dist/"));
});

// Build webbrowser bundle
gulp.task("bundle", function() {

    var libraryName = "gs1.js";
    var mainTsFilePath = "src/index.js";
    var outputFolder   = "dist/";
    var outputFileName = libraryName + ".js";

    var bundler = browserify({
        debug: true,
        standalone : libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});