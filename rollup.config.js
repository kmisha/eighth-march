import html from '@rollup/plugin-html'
import serve from 'rollup-plugin-serve'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {renderFile} from 'pug'

export default {
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        nodeResolve(),
        html({
            title: '8 March',
            template: ({ attributes, bundle, files, meta, publicPath, title }) => {
                return renderFile('src/index.pug', {
                    pageTitle: title
                })
            }
        }),
        serve({
            open: false,
            port: 8080,
            contentBase: 'dist'
        })
    ]
}
