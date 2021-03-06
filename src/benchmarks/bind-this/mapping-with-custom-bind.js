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
					return function() {
						var l2 = arguments.length;
						switch(l2) {
							case 0: return f.call(self);
							case 1: return f.call(self, arguments[0]);
							case 2: return f.call(self, arguments[0], arguments[1]);
							case 3: return f.call(self, arguments[0], arguments[1], arguments[2]);
						}
						throw new TypeError("The function was called with too many arguments (" + l2 + ")");
					};
				case 2:
					a1 = arguments[1];
					return function() {
						var l2 = arguments.length;
						switch(l2) {
							case 0: return f.call(self, a1);
							case 1: return f.call(self, a1, arguments[0]);
							case 2: return f.call(self, a1, arguments[0], arguments[1]);
							case 3: return f.call(self, a1, arguments[0], arguments[1], arguments[2]);
						}
						throw new TypeError("The function was called with too many arguments (" + l2 + ")");
					};
				case 3:
					a1 = arguments[1];
					a2 = arguments[2];
					return function() {
						var l2 = arguments.length;
						switch(l2) {
							case 0: return f.call(self, a1, a2);
							case 1: return f.call(self, a1, a2, arguments[0]);
							case 2: return f.call(self, a1, a2, arguments[0], arguments[1]);
							case 3: return f.call(self, a1, a2, arguments[0], arguments[1], arguments[2]);
						}
						throw new TypeError("The function was called with too many arguments (" + l2 + ")");
					};
				case 4:
					a1 = arguments[1];
					a2 = arguments[2];
					a3 = arguments[3];
					return function() {
						var l2 = arguments.length;
						switch(l2) {
							case 0: return f.call(self, a1, a2, a3);
							case 1: return f.call(self, a1, a2, a3, arguments[0]);
							case 2: return f.call(self, a1, a2, a3, arguments[0], arguments[1]);
							case 3: return f.call(self, a1, a2, a3, arguments[0], arguments[1], arguments[2]);
						}
						throw new TypeError("The function was called with too many arguments (" + l2 + ")");
					};
				}
				throw new TypeError("FUNCTION(...).bind() does not support more than three arguments");
			}
		};
	}

	return function mapping_with_function_(){
		input.map(FUNCTION(test.get).bind(test, "me"));
	};
};
