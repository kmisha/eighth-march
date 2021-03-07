const html = require('@rollup/plugin-html')

export default {
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        html({
            title: '8 March',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'}
            ]
        })
    ]
}
