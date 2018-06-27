module.exports = function (grunt) {
  grunt.initConfig({
    'jasmine': {
      'src': 'src/**/*.js',
      'options': {
        'specs': 'test/**.spec.js'
      }
    },
    'copy': {
      'main': {
        'files': [{
          'expand': true,
          'cwd': 'src/js',
          'src': '**',
          'dest': 'dist/js/'
        }]
      }
    },
    'sass': {
      'dist': {
        'files': [{
          'expand': true,
          'cwd': 'src/scss',
          'src': ['**/*.scss'],
          'dest': './dist/css/',
          'ext': '.css'
        }]
      }
    },
    'watch': {
      'sass': {
        'files': ['src/scss/**/*.scss'],
        'tasks': ['sass']
      },
      'scripts': {
        'files': ['src/js/**/*.js'],
        'tasks': ['copy']
      }
    },
    'browserSync': {
      'dev': {
        'bsFiles': {
          'src': [
            'dist/js/*.js',
            'dist/css/*.css',
            'dist/templates/*.html',
            'test/*.js'
          ]
        },
        'options': {
          'watchTask': true,
          'proxy': "http://localhost:3000",
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
};
