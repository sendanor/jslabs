/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	function get_property(key, obj) {
		return obj[key];
	}

	return function() {
		input.map(get_property.bind(undefined, "name"));
	};
};

/* EOF */
