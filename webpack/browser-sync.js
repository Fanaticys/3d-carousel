const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function () {
    return {
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:9000/',
                notify: false
            })
        ]
    }
}