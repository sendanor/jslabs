
"use strict";

/** Our implementation of bind() without support for `this` */
function our_bind(f, arg1) {
	return function(arg2) {
		return f(arg1, arg2);
	};
}

/** Our implementation of bind() without support for `this` */
function our_impl_3(f, a1, a2) {
	return function(a3) {
		return f(a1, a2, a3);
	};
}

/** Our implementation of bind() without support for `this` */
function our_impl_4(f, a1, a2, a3) {
	return function(a4) {
		return f(a1, a2, a3, a4);
	};
}

/** Our implementation of bind() without support for `this` */
function our_impl_5(f, a1, a2, a3, a4) {
	return function(a5) {
		return f(a1, a2, a3, a4, a5);
	};
}

/** Our implementation of bind() without support for `this` */
function our_impl_6(f, a1, a2, a3, a4, a5) {
	return function(a6) {
		return f(a1, a2, a3, a4, a5, a6);
	};
}

/** Different implementations */
var impls = [
	null,
	null,
	our_bind,
	our_impl_3,
	our_impl_4,
	our_impl_5,
	our_impl_6
];

/** Our implementation of bind() without support for `this` */
function our_bind_2(f) {
	return function our_bind_2_() {
		var args = Array.prototype.slice.call(arguments);
		var self = args.shift();
		if(self !== undefined) {
			throw new TypeError("We don't support this argument yet!");
		}
		args.unshift(f);
		return impls[args.length].apply(self, args);
	};
}

// Exports
module.exports = our_bind_2;

/* EOF */

