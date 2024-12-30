const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/hospital-management/' : '/',
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: [
                        require('tailwindcss'),
                        require('autoprefixer'),
                    ],
                },
            },
        },
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'Hospital Management System'
            return args
        })
    },
})