const net = require('net');

const client = net.connect({host: '127.0.0.1', port: 1337}, () => {
	console.log('connected to server!');
	client.write('LesGuignolsDeLInfo\n');
});

let b = [];
let players = [];
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
		data[1] = data[1].split('-');
		for (let i = 0; i < x; i++) {
			b[i] = data[1].slice(i * y, (i + 1) * y);
			b[i] = b[i].map(val => {
				return (Number(val) == val) ? Number(val) : val;
			});
		}
		players = data[2].substr(2).split('-').map(xy => {
			xy = xy.split(',');
			return {x: xy[0], y: xy[1]};
		});
	}
});

client.on('end', () => {
	console.log('disconnected from server');
});

let player = {
	x: 0,
	y: 0,
	nbF: 0,
	nbB: 0,
	sideOf: function (xPos, yPos) {
		if ((this.x === xPos) && (this.y - 1 === yPos)) {
			return 'N';
		} else if ((this.x === xPos) && (this.y + 1 === yPos)) {
			return 'S';
		} else if ((this.y === yPos) && (this.x - 1 === xPos)) {
			return 'O';
		} else if ((this.y === yPos) && (this.x + 1 === xPos)) {
			return 'E';
		} else if ((this.x === xPos) && (this.y === yPos)) {
			return 'C';
		} else {
			return 'I';
		}
	},
	canWalkOn: function (xPos, yPos, b) {
		if (['S', 'B', 'F'].indexOf(b[xPos][yPos]) !== -1) {
			//sand, beer or fries
			return true;
		} else if (Number(b[xPos][yPos]) == b[xPos][yPos]) {
			//number (mussel)
			return true;
		} else if ((b[xPos][yPos] === 'D') && (nbF > 0)) {
			//next is a dune and we got fries. can we walk on what’s on the other side?
			let otherSide = b[xPos + (xPos - this.x)][yPos + (yPos - this.y)];
			if ((['S', 'B', 'F'].indexOf(otherSide) !== -1) || (Number(otherSide) == otherSide)) {
				return true;
			}
		}
		return false;
	}
};
