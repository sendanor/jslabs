/** Benchmarks for different Array join implementations */

"use strict";

var copy = require('nor-data').copy;
var debug = require('nor-debug');

/** Test implementation */
var core = module.exports = {};

/** Get tests from directory */
core.getTests = function get_tests(dirname) {
	var PATH = require('path');
	var FS = require('fs');
	var tests = {};
	FS.readdirSync(dirname).forEach(function(file) {
		if( (file === "index.js") || (file === "run.js") ) {
			return;
		}
		if(file.substr(file.length - '.js'.length) !== '.js') {
			return;
		}
		var name = PATH.basename(file, '.js');
		tests[name] = require(dirname + '/' + file);
	});
	return tests;
};

/** Run benchmarks */
core.run = function(bench) {

	debug.assert(bench).is('object');
	debug.assert(bench.tests).is('object');
	debug.assert(bench.data).is('defined');

	var Benchmark = require('benchmark');
	var suite = new Benchmark.Suite();

	// add tests
	Object.keys(bench.tests).forEach(function(name) {
		//debug.log('loading name = ', name);

		var context = {
			"data": copy(bench.data)
		};

		var build_test = bench.tests[name];
		debug.assert(build_test).is('function');
		var test = build_test(context);
		debug.assert(test).is('function');
		suite.add(name, test);
	});

	//suite.on('start', function() {
	//})

	// add listeners
	suite.on('error', function(event) {
		console.error('ERROR: ' + event.target + ': ' + event.target.error);
	});

	suite.on('cycle', function(event) {
		console.log(String(event.target));
	});

	suite.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	});

	suite.run();
};

/* EOF */
