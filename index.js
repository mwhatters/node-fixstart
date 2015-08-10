var io = require('socket.io').listen(parseInt(process.env.PORT) || 5001);
var url = require('url');
var redis = require('redis');

var issueClient = redis.createClient();
var fixClient = redis.createClient();
var localStreamClient = redis.createClient();

issueClient.subscribe('issue-created')
fixClient.subscribe('fix-created')
localStreamClient.subscribe('stream')

io.on('connection', function(socket) {
});

issueClient.on('message', function(channel, data) {
	console.log('issue-created message recieved')
	console.log(data)
	io.sockets.emit('issue-created', JSON.parse(data))
})


fixClient.on('message', function(channel, data){
	console.log('fix-created message recieved')
	console.log(data)
	io.sockets.emit('fix-created', JSON.parse(data))
})

localStreamClient.on('message', function(channel, data){
	console.log('stream message recieved')
	console.log(data)
	io.sockets.emit('stream', JSON.parse(data))
})