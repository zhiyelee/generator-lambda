var handler = require('./').handler;
var ctx = require('./test/ctx');
var event = require('./test/helloworld');

handler(event, ctx);

