const path = require('path');

module.exports = {
    // chainWebpack: config => {
    //     const oneOfsMap = config.module.rule('scss').oneOfs.store;
    //     oneOfsMap.forEach(item => {
    //         item.use('style-resource')
    //             .loader('style-resources-loader')
    //             .options({
    //                 patterns: [
    //                     path.resolve(__dirname, './src/assets/scss/variables.scss'),
    //                   ],
    //             })
    //             .end();
    //     });
    // },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
            scss: {
                prependData: `@import "~@/assets/scss/vars/index.scss";`,
            },
        },
    },
};
