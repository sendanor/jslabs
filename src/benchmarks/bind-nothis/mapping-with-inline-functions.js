/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	return function() {
		input.map(function(obj) {
			return obj.name;
		});
	};

};

/* EOF */
