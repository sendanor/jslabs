/** Benchmark */
"use strict";
module.exports = {
	"data": require('./input.json'),
	"tests": require('src/lib/benchmarks/core.js').getTests(__dirname)
};
/* EOF */
