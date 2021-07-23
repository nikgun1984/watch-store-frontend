/* 
	This file configures all necessary setup for 
	live updates/compilations etc
*/

const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Static server
gulp.task("server", function () {
	browserSync.init({
		server: {
			baseDir: "src",
		},
	});
});

// SASS/SCSS compiler
gulp.task("styles", function () {
	return gulp
		.src("src/sass/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(
			rename({
				prefix: "",
				suffix: ".min",
			})
		)
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

/* 
	Live watch of SASS/SCSS for changes
	as well as tracking of HTML changes
*/
gulp.task("watch", function () {
	gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
	gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
