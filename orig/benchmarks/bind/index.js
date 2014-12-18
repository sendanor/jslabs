/** Benchmarks for different Array join implementations */

var BIND = require('src/bind/');
var BIND2 = require('src/bind2/');

/** Test data */
var _input = [
	{"name": "John"},
	{"name": "Mark"},
	{"name": "Lisa"},
	{"name": "Bart"},
	{"name": "Jack"},
	{"name": "Maria"}
];

function get_property_a(obj, key) {
	return obj[key];
}

var get_people_a = get_property_a.bind(undefined, _input);

function get_property_b(obj) {
	return function(key) {
		return obj[key];
	};
}

var get_people_b = get_property_b(_input);

/** Our implementation of bind() without support for `this` */
function our_bind(f, arg1) {
	return function(arg2) {
		return f(arg1, arg2);
	};
}

/** Saved function */
var get_people_c = our_bind(get_property_a, _input);

/** Another implementation */

function our_impl_3(f, a1, a2) {
	return function(a3) {
		return f(a1, a2, a3);
	};
}

function our_impl_4(f, a1, a2, a3) {
	return function(a4) {
		return f(a1, a2, a3, a4);
	};
}

function our_impl_5(f, a1, a2, a3, a4) {
	return function(a5) {
		return f(a1, a2, a3, a4, a5);
	};
}

/** Implementation for 6 arguments */
function our_impl_6(f, a1, a2, a3, a4, a5) {
	return function(a6) {
		return f(a1, a2, a3, a4, a5, a6);
	};
}

var impls = [
	null,
	null,
	our_bind,
	our_impl_3,
	our_impl_4,
	our_impl_5,
	our_impl_6
];

function our_bind_2() {
	var args = Array.prototype.slice.call(arguments);
	return impls[args.length].apply(undefined, args);
}

/** Mozilla.org Polyfill */
function mozilla_bind_polyfill(self) {
	return {
		"bind": function mozilla_bind_polyfill_(oThis) {

			if (typeof self !== 'function') {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
			}

			var aArgs   = Array.prototype.slice.call(arguments, 1);
			var fToBind = self;
			var fNOP    = function() {};
			var fBound  = function() {
				return fToBind.apply(self instanceof fNOP && oThis
					? self
					: oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			fNOP.prototype = self.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		}
	};
};

/** Optimized version based on original Mozilla.org Polyfill */
function mozilla_bind_polyfill2(self) {

	if (typeof self !== 'function') {
		// closest thing possible to the ECMAScript 5
		// internal IsCallable function
		throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	}

	var fToBind = self;

	return {
		"bind": function mozilla_bind_polyfill2_(oThis) {
			var aArgs   = Array.prototype.slice.call(arguments, 1);
			var fNOP = function() {};
			var fBound  = function() {
				return fToBind.apply(self instanceof fNOP && oThis
					? self
					: oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};
			fNOP.prototype = self.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		}
	};
};



/** Saved function */
var get_people_d = our_bind_2(get_property_a, _input);

var bind2_predefined = BIND2(get_property_a).bind(undefined, _input);

/** Different tests */
var _tests = {

	"mapping with .bind()": function(input) {
		return function() {
			Object.keys(input).map(get_property_a.bind(undefined, input));
		};
	},

	"mapping with function reference": function(input) {
		return function() {
			Object.keys(input).map(get_property_b(input));
		};
	},

	"mapping with pre-defined .bind()": function(input) {
		return function() {
			Object.keys(input).map(get_people_a);
		};
	},

	"mapping with predefined function reference": function(input) {
		return function() {
			Object.keys(input).map(get_people_b);
		};
	},

	"mapping with inline functions": function(input) {
		return function() {
			Object.keys(input).map(function(key) {
				return input[key];
			});
		};
	},

	"Custom bind implementation": function(input) {
		return function() {
			Object.keys(input).map(our_bind(get_property_a, input));
		};
	},

	"Custom bind implementation with saved function": function(input) {
		return function() {
			Object.keys(input).map(get_people_c);
		};
	},

	"Another custom implementation": function(input) {
		return function() {
			Object.keys(input).map(our_bind_2(get_property_a, input));
		};
	},

	"Another custom implementation with saved function": function(input) {
		return function() {
			Object.keys(input).map(get_people_d);
		};
	},

	"Mozilla.org Polyfill": function(input) {
		return function() {
			Object.keys(input).map(mozilla_bind_polyfill(get_property_a).bind(undefined, input));
		};
	},

	"Mozilla.org Polyfill2": function(input) {
		return function() {
			Object.keys(input).map(mozilla_bind_polyfill2(get_property_a).bind(undefined, input));
		};
	},

	"Our 1st implementation": function(input) {
		return function() {
			Object.keys(input).map(BIND(get_property_a)(undefined, input));
		};
	},

	"Our 2nd implementation": function(input) {
		return function() {
			Object.keys(input).map(BIND2(get_property_a).bind(undefined, input));
		};
	},

	"Our 2nd implementation (as predefined)": function(input) {
		return function() {
			Object.keys(input).map( bind2_predefined );
		};
	},

};

/** Test implementation */
require('./core.js')({
	"tests": _tests,
	"data": _input
});

/* EOF */
