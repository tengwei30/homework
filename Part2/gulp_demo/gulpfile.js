const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
// const cleanCss = require('gulp-clean-css')
// const sass = require('gulp-sass')
// const babel = require('gulp-babel')
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')
const loadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')
const plugins = loadPlugins()
const bs = browserSync.create()

// const rename = require('gulp-rename')
// // const fs = require('fs')

// exports.default = () => {
//   // 文件读取流
//   return src('src/*.css')
//     .pipe(cleanCss())
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(dest('dist'))
// }

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html',
    },
    {
      name: 'Features',
      link: 'features.html',
    },
    {
      name: 'About',
      link: 'about.html',
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce',
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme',
        },
        {
          name: 'divider',
        },
        {
          name: 'About',
          link: 'https://github.com/zce',
        },
      ],
    },
  ],
  pkg: require('./package.json'),
  date: new Date(),
}

const clean = () => {
  // 先清除，返回promise
  return del(['dist'])
}

const style = () => {
  return (
    src('src/assets/styles/*.scss', { base: 'src' })
      .pipe(plugins.sass({ outputStyle: 'expanded' }))
      // .pipe(cleanCss())
      .pipe(dest('dist'))
  )
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data }))
    .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' }).pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)

  bs.init({
    notify: false,
    port: 8080,
    files: 'dist/**',
    server: {
      baseDir: ['dist', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  })
}

const useref = () => {
  return src('dist/*.html', { base: 'dist' }).pipe(
    plugins
      .useref({ searchPath: ['dist', '.'] })
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          })
        )
      )
      .pipe(dest('release'))
  )
}

const compile = parallel(style, script, page)

// 在上线之前要执行的任务
const build = series(clean, parallel(compile, image, font, extra))

const develop = series(build, serve)

module.exports = {
  build,
  develop,
  useref,
}
