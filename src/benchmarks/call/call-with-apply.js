/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	function get_property(key, obj) {
		return obj[key];
	}

	return function() {
		get_property.apply(undefined, ["name", input]);
	};
};

/* EOF */
