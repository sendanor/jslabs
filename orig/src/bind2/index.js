
"use strict";

/** Cache for different templates */
var _apply_cache = {};

/** */
function build_args_str(type, args_name, args_len) {
	var cache_key = type + args_len;
	var cached = _apply_cache[cache_key];
	if(cached) {
		return cached;
	}
	var args_str = '';
	var i = 0;
	for(; i !== args_len; i += 1) {
		args_str += ((i !== 0) ? ', ' : '') + args_name + '[' + i + ']';
	}
	_apply_cache[cache_key] = args_str;
	return args_str;
}

/** */
function build_apply(args1_len) {

	var args1_str = build_args_str('A', 'args1', args1_len);
	var args_str_default = args1_str + ((args1_str !== '') ? ', ' : '');

	return function build_apply_(args2_len) {

		var cache_key = 'A'+args1_len+'B'+args2_len;
		var cached = _apply_cache[cache_key];
		if(cached) {
			return cached;
		}

		var args2_str = build_args_str('B', 'args2', args2_len);

		var str = 'return f(' + args_str_default + args2_str + ');';
		var f = new Function("f", "self", "args1", "args2", str);
		_apply_cache[cache_key] = f;
		return f;
	};
}

/** Eval apply */
function apply(f) {
	return function apply_(self, args1) {
		var f_ = build_apply(args1.length);
		return function apply__() {
			var args2 = Array.prototype.slice.call(arguments);
			return f_(args2.length)(f, self, args1, args2);
		};
	};
}

/** Our implementation of Function.prototype.bind() */
module.exports = function bind(f_) {
	var f = apply(f_);
	return {
		"bind": function bind_() {
			var args = Array.prototype.slice.call(arguments);
			var self = args.shift();
			return f(self, args);
		}
	};
};

/* EOF */

