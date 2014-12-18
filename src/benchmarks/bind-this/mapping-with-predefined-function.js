/** Benchmarks for different Array join implementations */

"use strict";

module.exports = function(input) {

	function get_property(obj, key) {
		return obj[key];
	}

	var get_input = get_property.bind(undefined, input);

	return function() {
		Object.keys(input).map(get_input);
	};

};
