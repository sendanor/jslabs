/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	/** Our implementation of bind() without support for `this` */
	function our_bind(f, arg1) {
		return function(arg2) {
			return f(arg1, arg2);
		};
	}

	function get_property(key, obj) {
		return obj[key];
	}

	var get_name = our_bind(get_property, "name");

	return function() {
		input.map(get_name);
	};
};

/* EOF */
