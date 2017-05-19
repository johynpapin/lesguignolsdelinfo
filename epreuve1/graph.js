module.exports = exports = class Graph {
	constructor(nodes, size) {
		this.nodes = nodes;
	}

	neighbors(node) {
		let neighbors = [];
		if (node.x > 1 && this.nodes[node.x - 1][node.y] !== 'D')
			neighbors.push({x: node.x - 1, y: node.y});
		if (node.x < this.nodes[0].length - 1 && this.nodes[node.x + 1][node.y] !== 'D')
			neighbors.push({x: node.x + 1, y: node.y});
		if (node.y > 1 && this.nodes[node.x][node.y - 1] !== 'D')
			neighbors.push({x: node.x, y: node.y - 1});
		if (node.y < this.nodes.length - 1 && this.nodes[node.x][node.y + 1] !== 'D')
			neighbors.push({x: node.x, y: node.y + 1});
	}

	cost() {
		return 1;
	}
};
