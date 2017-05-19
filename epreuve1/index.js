const astar = require('./astar');
const Graph = require('./graph');
const net = require('net');

const client = net.connect({host: '127.0.0.1', port: 1337}, () => {
	console.log('connected to server!');
	client.write('LesGuignolsDeLInfo\n');
});

let b = {};
let number;
let players = [];
let toBeer = false;
try{
client.on('data', data => {
	console.time('data');
	data = data.toString().slice(0, -1);
	if (data.length === 1) {
		number = Number(data);
		console.log('We are the player no ' + number);
	} else if (data === 'FIN') {
		console.log('End of the round');
	} else {
		console.time('generation');
		data = data.split('/');
		const x = Number(data[0].split('x')[0]);
		const y = Number(data[0].split('x')[1]);
		data[1] = data[1].split('-');
		let mussels = [];
		let beers = [];
		for (let i = 0; i < y; i++) {
			let line = data[1].slice(i * x, (i + 1) * x);
			for (let j = 0; j < x; j++) {
				if (Number(line[j]) == line[j]) {
					line[j] = Number(line[j]);
					mussels.push({x: j, y: i, val: line[j]});
				} else if (line[j] === 'B') {
					beers.push({x: j, y: i});
				}
				b[JSON.stringify({x: j, y: i})] = line[j];
			}
		}
		mussels.sort((a, b) => { return b.val - a.val; });
		players = data[2].substr(2).split('-').map(xy => {
			xy = xy.split(',');
			return {x: Number(xy[0]), y: Number(xy[1])};
		});
		console.timeEnd('generation');
		console.time('astar');
		console.log(players[number].x, players[number].y, b[{x: players[number].x, y: players[number].y}]);
		//paths from us to every beer
		let beersPaths = {};
		for (const beer of beers) {
			beersPaths[JSON.stringify(beer)] = {fromPlayer: astar.search(new Graph(b, {x: x, y: y}), players[number], {x: beer.x, y: beer.y}), toMussels: {}};
		}
		for (const beer of beers) {
			for (const mussel of mussels) {
				beersPaths[JSON.stringify(beer)].toMussels[JSON.stringify(mussel)] = astar.search(new Graph(b, {x: x, y: y}), beer, {x: mussel.x, y: mussel.y});
			}
		}
		//paths for every player to every mussel
		for (const player of players) {
			player.paths = {};
			player.bestChoice = {};
			for (const mussel of mussels) {
				player.paths[JSON.stringify(mussel)] = astar.search(new Graph(b, {x: x, y: y}), player, {x: mussel.x, y: mussel.y});
				if (player === players[number]) {
					//that’s us
					for (let beerPath in beersPaths) {
						beerPath = beersPaths[beerPath];
						if (beerPath.fromPlayer.length - 3 + beerPath.toMussels[JSON.stringify(mussel)].length < player.paths[JSON.stringify(mussel)]) {
							player.paths[JSON.stringify(mussel)] = beerPath.fromPlayer;
						}
					}
				}
			}
		}
		let musselsBestPlayer = {};
		for (const mussel of mussels) {
			musselsBestPlayer[JSON.stringify(mussel)] = players[number];
			for (const player of players) {
				if (player.paths[JSON.stringify(mussel)].length < musselsBestPlayer[JSON.stringify(mussel)].paths[JSON.stringify(mussel)].length) {
					musselsBestPlayer[JSON.stringify(mussel)] = player;
				}
			}
		}
		let ourMussels = [];
		for (const mussel in musselsBestPlayer) {
			if (musselsBestPlayer[mussel] === players[number]) {
				ourMussels.push(mussel);
			}
		}
		if (ourMussels.length !== 0) {
			let dirCur = dir(players[number], players[number].paths[ourMussels[0]][0]);
			let notUsed = false;
			switch (dirCur) {
			case 'N':
				toBeer = b[{x: players[number].x, y: players[number].y - 1}] === 'B';
				notUsed = toBeer;
				break;
			//42
			case 'S':
				toBeer = b[{x: players[number].x, y: players[number].y + 1}] === 'B';
				notUsed = toBeer;
				break;
			case 'O':
				toBeer = b[{x: players[number].x - 1, y: players[number].y}] === 'B';
				notUsed = toBeer;
				break;
			case 'E':
				toBeer = b[{x: players[number].x + 1, y: players[number].y}] === 'B';
				notUsed = toBeer;
				break;
			}
			if (toBeer && !notUsed && players[number].paths[ourMussels[0]].length >= 3) {
				dirCur = 'B-';
				dirCur += dir(players[number], players[number].paths[ourMussels[0]][0]) + '-';
				dirCur += dir(players[number].paths[ourMussels[0]][0], players[number].paths[ourMussels[0]][1]) + '-';
				dirCur += dir(players[number].paths[ourMussels[0]][1], players[number].paths[ourMussels[0]][2]);
				console.log(dirCur);
				toBeer = false;
				client.write(dirCur + '\n');
			} else {
				client.write(dirCur + '\n');
			}
		} else {
			let nb = 0;
			if (mussels.length >= 2 && Math.abs(mussels[0].val - mussels[1].val) <= 20) {
				nb = 1;
			}
			let dirCur = dir(players[number], players[number].paths[JSON.stringify(mussels[nb])][0]);
			let notUsed = false;
			switch (dirCur) {
			case 'N':
				toBeer = b[{x: players[number].x, y: players[number].y - 1}] === 'B';
				notUsed = toBeer;
				break;
			//42
			case 'S':
				toBeer = b[{x: players[number].x, y: players[number].y + 1}] === 'B';
				notUsed = toBeer;
				break;
			case 'O':
				toBeer = b[{x: players[number].x - 1, y: players[number].y}] === 'B';
				notUsed = toBeer;
				break;
			case 'E':
				toBeer = b[{x: players[number].x + 1, y: players[number].y}] === 'B';
				notUsed = toBeer;
				break;
			}
			if (toBeer && !notUsed && players[number].paths[JSON.stringify(mussels[nb])].length >= 3) {
				dirCur = 'B-';
				dirCur += dir(players[number], players[number].paths[JSON.stringify(mussels[nb])][0]) + '-';
				dirCur += dir(players[number].paths[JSON.stringify(mussels[nb])][0], players[number].paths[JSON.stringify(mussels[nb])][1]) + '-';
				dirCur += dir(players[number].paths[JSON.stringify(mussels[nb])][1], players[number].paths[JSON.stringify(mussels[nb])][2]);
				console.log(dirCur);
				toBeer = false;
				client.write(dirCur + '\n');
			} else {
				client.write(dirCur + '\n');
			}
		}
		console.timeEnd('astar');
	}
	console.timeEnd('data');
});
}catch(e) {}

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

function dir(from, to) {
	if (from.x < to.x)
		return 'E';
	if (from.x > to.x)
		return 'O';
	if (from.y < to.y)
		return 'S';
	if (from.y > to.y)
		return 'N';
	return 'C';
}

