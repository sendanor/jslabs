/** Benchmarks for different Array join implementations */
"use strict";
module.exports = function mapping_with_function(opts){

	function get_property(key) {
		return function get_property_(obj) {
			return obj[key];
		};
	}

	var input = opts.data;

	return function mapping_with_function_(){
		input.map(get_property("name"));
	};
};
