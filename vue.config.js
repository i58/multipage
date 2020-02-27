const glob = require('glob')
const pages = {}
/**
 * vue-cli 配置文件
 */
const isProduction = process.env.NODE_ENV === 'production'

glob.sync('./src/pages/**/main.ts').forEach(path => {
    const chunk = path.split('./src/pages/')[1].split('/main.ts')[0]
    pages[chunk] = {
        entry: path,
        title: 'TEST',
        template: 'public/index.html',
        chunks: ['vendors', 'chunk-vendors', 'chunk-common', chunk]
    }
})

module.exports = {
    pages,
    // 基本路径
    // publicPath: isProduction ? './' : '/',
    // 输出文件目录 不写则默认根目录
    outputDir: 'dist',
    // 静态资源目录 (js, css, img, fonts)
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    chainWebpack: config => {
        // 生产环境配置
        if (isProduction) {
            // 删除预加载
            // Object.keys(pages).forEach(name => {
            //     config.plugins.delete(`preload-${name}`)
            //     config.plugins.delete(`prefetch-${name}`)

            //     // 生产环境注入cdn
            //     // config.plugin(`html-${name}`).tap(args => {
            //     //     args[0].cdn = cdns
            //     //     return args
            //     // })
            // })
            // 压缩代码
            config.optimization.minimize(true)
            // 分割代码
            config.optimization.splitChunks({
                chunks: 'all'
            })
        }
    },
    //webpack配置
    configureWebpack: config => {
        //警告 webpack 的性能提示
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (file) {
                return file.endsWith('.js')
            }
        }
    },
    parallel: require('os').cpus().length > 1,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}
