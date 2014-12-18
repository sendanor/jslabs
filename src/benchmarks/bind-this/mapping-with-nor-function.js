/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function mapping_with_function(opts){

	var FUNCTION = require('nor-function');

	var input = opts.data;

	function Test() {
		this.prefix = "na";
	}

	Test.prototype.get = function(key) {
		var key_ = this.prefix + key;
		return function(obj) {
			return obj[key_];
		};
	};

	var test = new Test();
	var get_me = FUNCTION(test.get).bind(test, "me");
	return function mapping_with_function_(){
		input.map(get_me);
	};
};
