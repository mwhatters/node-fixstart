var io = require('socket.io').listen(parseInt(process.env.PORT) || 5001);
var url = require('url');
var redis = require('redis');

var issueClient = redis.createClient();
issueClient.subscribe('issue-created')


io.on('connection', function(socket) {
});

issueClient.on('message', function(channel, data) {
	console.log('issue-created message recieved')
	console.log(data)
	io.sockets.emit('issue-created', JSON.parse(data))
})