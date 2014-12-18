/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	function get_property(key, obj) {
		return obj[key];
	}

	var get_name = get_property.bind(undefined, "name");

	return function() {
		input.map(get_name);
	};
};

/* EOF */
