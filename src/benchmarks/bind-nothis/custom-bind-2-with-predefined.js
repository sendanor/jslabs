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

	function get_property(key, obj) {
		return obj[key];
	}

	function our_bind_2() {
		var args = Array.prototype.slice.call(arguments);
		return impls[args.length].apply(undefined, args);
	}

	var get_name = our_bind_2(get_property, "name");

	return function() {
		input.map(get_name);
	};
};

/* EOF */
