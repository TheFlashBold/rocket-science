
module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: '/Users/holzer/PhpstormProjects/rocket-science',
                        options: {
                            index: 'rocket_science.html',
                            maxAge: 300000
                        }
                    },
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
}