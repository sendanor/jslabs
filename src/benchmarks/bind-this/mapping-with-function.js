/** Benchmarks for different Array join implementations */
"use strict";
module.exports = function mapping_with_function(opts){

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

	return function mapping_with_function_(){
		input.map(test.get("me"));
	};
};
