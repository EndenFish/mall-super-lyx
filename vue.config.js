module.exports = {
    configureWebpack:{
        resolve:{
            // extensions:[]  配置后缀名
            // 配置别名
            alias:{
                // '@': 'src',
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'common': '@/common',
                'views': '@/views',
            }
        }
    }
}