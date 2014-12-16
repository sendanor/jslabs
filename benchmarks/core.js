/** Benchmarks for different Array join implementations */

var debug = require('nor-debug');

/** Test implementation */
module.exports = function(bench) {

	debug.assert(bench).is('object');
	debug.assert(bench.tests).is('object');
	debug.assert(bench.data).is('defined');

	var Benchmark = require('benchmark');
	var suite = new Benchmark.Suite;

	var input;

	// add tests
	Object.keys(bench.tests).forEach(function(name) {
		var test = bench.tests[name];
		suite.add(name, function() {
			return test(input);
		});
	});

	suite.on('start', function() {
		input = [].concat(bench.data);
	})

	// add listeners
	suite.on('error', function(event) {
		console.error('ERROR: ' + event.target + ': ' + event.target.error);
	})

	suite.on('cycle', function(event) {
		console.log(String(event.target));
	})

	suite.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	})

	suite.run();
};

/* EOF */
