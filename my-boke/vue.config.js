const path = require('path');
module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('_s', path.resolve(__dirname, 'src/assets'))
    },
}