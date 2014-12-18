/** Benchmark */
"use strict";
var core = require('src/lib/benchmarks/core.js');
core.run({
	"data": require('./input.json'),
	"tests": core.getTests(__dirname)
});
/* EOF */
