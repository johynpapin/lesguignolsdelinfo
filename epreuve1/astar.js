class PriorityQueue {
	constructor() {
		this.data = [];
	}

	push(element, priority) {
  	priority = +priority;
		let i;
  	for (i = 0; i < this.data.length && this.data[i][1] > priority; i++);
  	this.data.splice(i, 0, [element, priority])
	}

	pop() {
		return this.data.shift()[0];
	}

	size() {
		return this.data.length;
	}

	empty() {
		return this.size() === 0;
	}
}

function heurestic(p0, p1) {
	return Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
}

exports.search = function (graph, start, goal) {
	let frontier = new PriorityQueue();
	frontier.push(start, 0);
	let cameFrom = {};
	let costSoFar = {};
	cameFrom[JSON.stringify(start)] = null;
	costSoFar[JSON.stringify(start)] = 0;

	while (!frontier.empty()) {
		const current = frontier.pop();

		if (current === goal) break;

		for (const next of graph.neighbors(current)) {
			console.log('next', next, costSoFar);
			const newCost = costSoFar[JSON.stringify(current)] + graph.cost(current, next);
			if (!costSoFar.hasOwnProperty(JSON.stringify(next)) || newCost < costSoFar[JSON.stringify(next)]) {
				console.log('olala');
				costSoFar[JSON.stringify(next)] = newCost;
				const priority = newCost + heurestic(goal, next);
				console.log('priority : ' + priority);
				frontier.push(next, priority);
				cameFrom[JSON.stringify(next)] = current;
			}
			console.log('Taille de la pq : ' + frontier.size());
		}
	}

	return {cameFrom: cameFrom, costSoFar: costSoFar};
}
