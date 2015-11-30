var path = require('path');

var projectDir = path.join(__dirname, '/..');
/*
 * Configuration Options for the Gulp Build
 */
module.exports = {

    /*
     * Project Structure
     */
    project: {
        app: {
            base: path.join(projectDir, '/src/app'),
            main: 'app.ts'
        },
        assets: {
            base: path.join(projectDir, '/src/assets')
        },
        target: {
            base: path.join(projectDir, '/target'),
            main: 'app.js'
        }
    },

    /*
     * TypeScript Compiler Options
     */
    typescript: {
        removeComments: false,
        target: 'ES5',
        module: 'es6',
        noExternalResolve: true,
        noImplicitAny: false
    },

    /*
     * Connect HTTP-Server Options
     */
    server: {
        port: 9042
    }
};