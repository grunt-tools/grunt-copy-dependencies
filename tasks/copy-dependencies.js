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

  grunt.registerMultiTask('copyDependencies', 'Dependencies copier (bower or npm)', function() {


    var extend = require('util')._extend,
        options = extend({
          manager: 'bower'
        }, this.options()),
        path = require('path'),
        manager = require('package-manager')(options.manager),
        cwd = process.cwd(),
        src = [''];

    console.log('dest', cwd, this.data.dest);

    if( !this.data.dest || path.join( cwd, this.data.dest ) === cwd ) {
      throw 'invalid dest dir: ' + this.data.dest;
    }

    if( typeof this.data.src === 'string' ) {
      src = [this.data.src];
    } else if( this.data.src instanceof Array ) {
      src = this.data.src;
    } else if( this.data.src ) {
      throw 'src should be a string or array of strings';
    }

    src = src.map(function (value) { return grunt.config.process(value); });

    try {
      src.forEach(function (iSrc) {
        manager.find( extend(options, { src: iSrc || 'dependencies', append: true }) );
      });

      manager.copy( grunt.config.process(this.data.dest), options );
    } catch (err) {
      grunt.fail.fatal(err);
    }
  });

};
