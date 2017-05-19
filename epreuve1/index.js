const net = require('net');

const client = net.connect({host: '127.0.0.1', port: 1337}, () => {
	console.log('connected to server!');
	client.write('world!\r\n');
});

let b = { // Board
	size: {
		x: 0,
		y: 0
	}
}

client.on('data', data => {
	data = data.toString();
	if (data === 'FIN') {
		console.log('End of the round');
	}
	console.log(data.toString());
	data = data.toString().split('/');
	b.size.x = Number(data[0].split('x')[0]);
	b.size.y = Number(data[0].split('x')[1]);
	console.log(b);
	client.end();
});

client.on('end', () => {
	console.log('disconnected from server');
});
