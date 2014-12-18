/** Benchmarks for different Array join implementations */

"use strict";

module.exports = function(input) {

	function get_property(obj, key) {
		return obj[key];
	}

	return function() {
		Object.keys(input).map(get_property(input));
	};

};
