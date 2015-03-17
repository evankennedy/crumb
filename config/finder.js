// Dependencies
var glob = require('glob'),
	path = require('path');

// Quick Find
module.exports = function(file) {
	return module.exports.all[file];
};

// Initialization
module.exports.all = {};
['models','routes','controllers'].forEach(function(type) {
	module.exports[type] = function(file) {
		return module.exports[type][file];
	};

	glob('./modules/**/' + type + '/*.js', {sync: true}).forEach(function(file) {
		module.exports.all[file.split('/').slice(-1)[0].replace(/\.js$/,'')] = path.resolve(file);
		module.exports[type][file.split('/').slice(-1)[0].replace(/\.js$/,'')] = path.resolve(file);
	});
});

// Iterator
var iterator = function(fn, type) {
	var m = module.exports[type || 'all'];
	for(var p in m) if(m.hasOwnProperty(p) && p != 'forEach') {
		fn.call({key: p, value: m[p]}, m[p]);
	}
};

module.exports.forEach = function(fn) {
	iterator(fn, 'all');
};

['all', 'models','routes','controllers'].forEach(function(type) {
	module.exports[type].forEach = function(fn) {
		iterator(fn, type);
	};
});
