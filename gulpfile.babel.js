import gulp from 'gulp'
import gutil from 'gulp-util'
import tap from 'gulp-tap'
import gap from 'gulp-append-prepend'
import rewriteImgPath from 'gulp-rewrite-image-path'
import replace from 'gulp-replace'
import MarkdownIt from 'markdown-it'
import mdImSize from 'markdown-it-imsize'
import mdAdmonition from 'markdown-it-admonition'
import mdTocAndAnchor from 'markdown-it-toc-and-anchor'
import productionLinks from './src/productionLinks.js'
import path from 'path'

const MARKDOWN_GLOB = 'src/**/*.md'

let md = new MarkdownIt({ html: true })
  .use(mdImSize, { autofill: true, html: true, typographer: true })
  .use(mdAdmonition)
  .use(mdTocAndAnchor, { tocFirstLevel: 2, tocLastLevel: 3, anchorLink: false })

function _markdownToHtml(file) {
  let result = md.render(file.contents.toString())
  file.contents = new Buffer.from(result)
  file.path = gutil.replaceExtension(file.path, '.html')
}

function build() {
  return gulp.src(MARKDOWN_GLOB)
    .pipe(replace(/\*\*Title\:\*\*.*/g, ''))
    .pipe(replace(/\[(.*)\]\: (.*)/g, function(match, key, file) {
      let anchor = '';
      if (file.indexOf('#') != -1) {
        anchor = file.substr(file.indexOf('#'));
        file = file.substr(0, file.indexOf('#'));
      }
      if (file.length == 0 && anchor.length > 0) return match; // is a reference on the same file
      if (file.startsWith('https://') || file.startsWith('http://')) return match; // is a complete URL

      let dest = path.normalize(path.join(path.dirname(this.file.relative), file)).replace(/\\/g, '/');
      if (dest in productionLinks) {
        return `[${key}]: ${productionLinks[dest]}${anchor}`;
      } else {
        throw Error(`No production link found for "${dest}" in src/productionLinks.js - please update (matched ${match} in ${this.file.relative})`);
      }
    }))
    .pipe(tap(_markdownToHtml))
    .pipe(gap.prependFile('src/header.html'))
    .pipe(gap.prependFile('src/footer.html'))
    .pipe(rewriteImgPath({ path: 'https://about.signpath.io/wp-content/uploads' }))
    .pipe(gulp.dest('build'));
}

function buildLocal() {
  return gulp.src(MARKDOWN_GLOB)
    .pipe(tap(_markdownToHtml))
    .pipe(gap.prependFile('src/local/header.html'))
    .pipe(gap.prependFile('src/local/footer.html'))
    .pipe(rewriteImgPath({ path: '../../src/images' }))
    .pipe(gulp.dest('buildLocal'))
}

function watchLocal() {
  gulp.watch(MARKDOWN_GLOB, buildLocal)
}

function watch() {
  gulp.watch(MARKDOWN_GLOB, build)
}



export default build;
export {
  build,
  buildLocal,
  watch,
  watchLocal
};

// TODO
// * check if file exists