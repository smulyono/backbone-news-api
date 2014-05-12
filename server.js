#!/usr/bin/env node
var server = require('node-static-server');

server.set('env', 'production');
server.set('port', process.env.PORT || 3001);
server.set('ipaddress', process.env.IP_ADDRESS || '0.0.0.0');

server.serve({
    "/" : __dirname,
    "/test" : __dirname + '/example'
});

var server = server.listen(server.get('port'),
    server.get('ipaddress'),
    function() {
        console.log('Backbone-news-api Development server');
        console.log('Local server listening on port ' + server.address().port);
    }
);
