var requireDir = require('require-dir');

// import all tasks
requireDir('./gulp/tasks', {recurse: true});