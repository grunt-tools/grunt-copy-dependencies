/*
 * grunt-package-manager
 * https://github.com/jstools/grunt-package-manager
 *
 * Copyright (c) 2015 Jesús Germade
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    dir: {
      tmp: '.tmp'
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['.tmp']
    },

    // Configuration to be run (and then tested).
    copyDependencies: {
      default_options: {
        dest: '<%= dir.tmp %>',
        options: {
          manager: 'npm'
        }
      },
      custom_options: {
        dest: '<%= dir.tmp %>',
        options: {
          expand: true,
          manager: 'npm'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copyDependencies', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
