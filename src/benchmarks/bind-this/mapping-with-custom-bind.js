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

	function FUNCTION(f) {
		return {
			"bind": function(self) {
				var l = arguments.length;
				var a1, a2, a3;
				switch(l) {
				case 0: throw new TypeError("FUNCTION(...).bind() must have at least one argument");
				case 1:
					return function() { return f.call(self); };
				case 2:
					a1 = arguments[1];
					return function() { return f.call(self, a1); };
				case 3:
					a1 = arguments[1];
					a2 = arguments[2];
					return function() { return f.call(self, a1, a2); };
				case 4:
					a1 = arguments[1];
					a2 = arguments[2];
					a3 = arguments[3];
					return function() { return f.call(self, a1, a2, a3); };
				default: throw new TypeError("FUNCTION(...).bind() does not support more than three arguments");
				}
			}
		};
	}

	return function mapping_with_function_(){
		input.map(FUNCTION(test.get).bind(test, "me"));
	};
};
