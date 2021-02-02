const {src,dest,watch,series,parallel}=require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel')
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');








const input = 
{
sassPath : './src/scss/**/*.scss',
jsPath : './src/js/**/*.js',
Browserslist : './.Browserslist'
}
const plugins = [
  autoprefixer(),
  // cssnano()
];
function sassTask(){
return src(input.sassPath)
.pipe(sourcemaps.init())
.pipe(sass())
.pipe(postcss(plugins))
.pipe(sourcemaps.write('.'))
.pipe(dest('./public/css'))

}


function jsTask(){
    return (
        src("./src/js/**/*.js")
          // Stop the process if an error is thrown.
          .pipe(plumber())
          // Transpile the JS code using Babel's preset-env.
          .pipe(
            babel({
              presets: [
                [
                  "@babel/env",
                  {
                    modules: false
                  }
                ]
              ]
            })
          )
          // Save each component as a separate file in dist.
          .pipe(dest("./public/js/build"))
      )
}
function watchTask(){
    watch([input.sassPath,input.jsPath],parallel(sassTask,jsTask))
}


exports.watch =series(parallel(sassTask,jsTask),watchTask);