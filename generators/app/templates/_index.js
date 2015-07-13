// var AWS = require('aws');
var util = require('util');

// Please do not change the function name `handler`, if you want, please change the Makefile too.
exports.handler = function(event, ctx) {
  console.log('Reading data from event\n', util.inspect(event, {depth: 5}));
  ctx.succeed(event);
};
