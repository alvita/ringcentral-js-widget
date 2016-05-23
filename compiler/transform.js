var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')
var stage2 = require('babel-preset-stage-2')
var fs = require('fs')
var bundle = require('./bundle').bundle
var UglifyJS = require("uglify-js")
var minifyHTML = require('html-minifier').minify

const TEMP_FILE = '__w_temp.js'
const SCRIPT_HEADER = 'w.register(function() {'
const SCRIPT_TRAILER = '})'
var scope = (id) => postcss.plugin('scope', function() {
    return function(root) {
        root.each(function rewriteSelector(node) {
            if (!node.selector) {
                // handle media queries
                if (node.type === 'atrule' && node.name === 'media') {
                    node.each(rewriteSelector)
                }
                return
            }
            node.selector = id + ' ' + node.selector
        })
    }
})

function transform(input, options) {
    var id = options.widgetId
    input.template = minifyHTML(input.template, {
      removeAttributeQuotes: true,
      removeComments: true
    })
    return transformScript(input).then(input => transformStyle(input, options.scopedStyle, id))
}

function transformScript(input) {
    // FIXME: don't modify original data
    if (input.script.indexOf('w.register') === -1) {
        input.script = SCRIPT_HEADER + input.script + SCRIPT_TRAILER
    }
    if (input.script) {
        input.script = 
            UglifyJS.minify(
                babel.transform(input.script, {
                    presets: [es2015, stage2]
                }).code, {
                fromString: true
            }).code
    }
    fs.writeFileSync(TEMP_FILE, input.script)
    // TODO: remove temp.js
    return bundle(TEMP_FILE).then(bundle => {
        input.script && (input.script = bundle)
        return input
    })
}

function transformStyle(input, scopedStyle, id) {
    var processors = [autoprefixer, precss]
    if (scopedStyle)
        processors.push(scope(id))
    // FIXME: don't modify original data
    if (!input.style)
        return Promise.resolve(input)
    return postcss(processors).process(input.style)
    .then(result => {
        input.style = result.css
        return input
    })
    .catch(e => console.error(e))
}
exports.transform = transform
