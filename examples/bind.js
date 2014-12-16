
var bind = require('src/bind/');

/** Some test data */
var people = [
  {"name": "John"},
  {"name": "Mark"},
  {"name": "Lisa"},
  {"name": "Bart"},
  {"name": "Jack"},
  {"name": "Maria"}
];

/** */
function get_property(obj, key) {
	return obj[key];
}

/* Test it */
console.log( Object.keys(people).map(bind(get_property)(undefined, people)) );

