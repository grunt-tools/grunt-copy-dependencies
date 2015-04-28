/*
 * grunt-package-manager
 * https://github.com/jstools/grunt-package-manager
 *
 * Copyright (c) 2015 Jesús Germade
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('package_manager', 'Package Manager for dependencies', function() {

    var options = this.options({
          manager: 'bower'
        }),
        path = require('path'),
        manager = require('package-manager'),
        cwd = process.cwd(),
        src = [''];

    if( !options.dest || path.join( cwd, options.dest ) === cwd ) {
      throw 'invalid dest dir: ' + options.dest;
    }

    if( typeof options.src === 'string' ) {
      src = [options.src];
    } else if( options.src instanceof Array ) {
      src = options.src;
    } else if( options.src ) {
      throw 'src should be a string or array of strings';
    }

    src.forEach(function (iSrc) {
      manager.find({ cwd: options.cwd, src: iSrc || 'dependencis', append: true });
    });

    manager.copy(dest);
  });

};
