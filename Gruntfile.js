/*global module:false*/
module.exports = function(grunt) {

  // Keyword substitution
  function process( code ) {
    return code

      // Embed version
      .replace(/\$Rev.*\$/g, grunt.config( "pkg" ).version)

      // Embed date (yyyy-mm-ddThh:mmZ)
      .replace(/\$Date\$/g, (new Date()).toISOString().replace(/:\d+\.\d+Z$/, "Z"));
  }

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      "options": {
        "banner": '<%= banner %>',
        "process": process,
        "stripBanners": false
      },
      "dist": {
        src: ['<%= pkg.main %>'],
        dest: 'dist/<%= pkg.main %>'
      },
      "css-chainer": {
        src: ['qunitchainer.css'],
        dest: 'dist/qunitchainer.css'
      },
      "css-qunit-dark": {
        src: ['qunit/qunit.css'],
        dest: 'dist/qunit.css'
      },
      "html-control": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['0-control.html'],
        dest: 'dist/0-control.html'
      },
      "html-monitor": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['0-monitor.html'],
        dest: 'dist/0-monitor.html'
      },
      "pl-replace": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['replace.pl'],
        dest: 'dist/replace.pl'
      },
      "sample-q1": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/q-test.html'],
        dest: 'dist/sample/q-test.html'
      },
      "sample-q2": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/q-test2.html'],
        dest: 'dist/sample/q-test2.html'
      },
      "sample-q3": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/q-test3.html'],
        dest: 'dist/sample/q-test3.html'
      },
      "sample-q4": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/q-test4.html'],
        dest: 'dist/sample/q-test4.html'
      },
      "sample-test-plan": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/test-plan.js'],
        dest: 'dist/sample/test-plan.js'
      },
      "sample-test-object": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['sample/test-this-object.js'],
        dest: 'dist/sample/test-this-object.js'
      },
      "readme": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['README.md'],
        dest: 'dist/README.md'
      },
      "license": {
        options: {
          "banner": '',
          "process": process
        },
        src: ['LICENSE'],
        dest: 'dist/LICENSE'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.title %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      package: {
        src: ['package.json', 'Gruntfile.js']
      },
      all: {
        src: '**/*.js'
      }
    },
    connect: {
      uses_defaults: {}
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('disabled', ['jshint', 'qunit', 'concat', 'uglify']);

};
