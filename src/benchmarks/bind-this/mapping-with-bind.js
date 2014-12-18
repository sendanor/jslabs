/** Benchmarks for different Array join implementations */
"use strict";

module.exports = function(opts) {

	var input = opts.data;

	function Test() {
		this.prefix = "na";
	}

	Test.prototype.get = function(key, obj) {
		return obj[this.prefix + key];
	};

	var test = new Test();

	return function() {
		input.map(test.get.bind(test, "me"));
	};
};

/* EOF */
