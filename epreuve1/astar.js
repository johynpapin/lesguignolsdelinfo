class Priorityqueue {
	constructor() {
		this.data = [];
	}

	push(element, priority) {
  	priority = +priority
  	for (var i = 0; i < this.data.length && this.data[i][1] > priority; i++);
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
	let frontier = new Priorityqueue();
	frontier.push(start, 0);
	let cameFrom = {};
	let costSoFar = {};
	cameFrom[start] = null;
	costSoFar[start] = 0;

	while (!frontier.empty()) {
		const current = frontier.pop();

		if (current === goal) break;

		for (const next of graph.neighbors(current)) {
			const newCost = costSoFar[current] + graph.cost(current, next);
			if (costSoFar[next] === undefined || newCost < costSoFar[next]) {
				costSoFar[next] = newCost;
				const priority = newCost + heurestic(goal, next);
				frontier.put(next, priority);
				cameFrom[next] = current;
			}
		}
	}

	return {cameFrom: cameFrom, costSoFar: costSoFar};
}
