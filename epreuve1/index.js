const net = require('net');

const client = net.connect({host: '127.0.0.1', port: 1337}, () => {
	console.log('connected to server!');
	client.write('LesGuignolsDeLInfo');
});

client.on('data', data => {
	data = data.toString().slice(0, -1);
	if (data.length === 1) {
		b.number = Number(data);
		console.log('We are the player no ' + b.number);
	} else if (data === 'FIN') {
		console.log('End of the round');
	} else {
		console.log('test')
		data = data.split('/');
		const x = Number(data[0].split('x')[0]);
		const y = Number(data[0].split('x')[1]);
	}
});

client.on('end', () => {
	console.log('disconnected from server');
});
