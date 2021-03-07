import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import {terser} from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import cleanup from 'rollup-plugin-cleanup'
import {renderFile} from 'pug'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

const isDev = process.env.BUILD === 'dev';

const plugins = [
    cleanup(),
    postcss({
        extract: true,
        minimize: { preset: 'default' },
        plugins: [
            postcssPresetEnv({ stage: 0 }),
            autoprefixer()
        ]
    }),
    html({
        title: '8 March',
        template: ({ attributes, bundle, files, meta, publicPath, title }) => {
            return renderFile('src/index.pug', {
                pageTitle: title,
                style: files.css[0].fileName
            })
        }
    })
]

if (isDev) {
    plugins.push(
        serve({
            open: false,
            port: 8080,
            contentBase: 'dist'
        })
    )
} else {
    plugins.push(
        terser()
    )
}

export default {
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: plugins,
    watch: {
        exclude: 'node_modules/**'
    }
}
