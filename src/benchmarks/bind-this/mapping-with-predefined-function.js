/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

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

	var get_name = test.get("me");

	return function() {
		input.map(get_name);
	};

};
