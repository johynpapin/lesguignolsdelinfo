module.exports = exports = class Graph {
	constructor(nodes, size) {
		this.nodes = nodes;
	}

	neighbors(node) {
		let neighbors = [];
		if (node.x > 1 && this.nodes[node.x - 1][node.y] !== 'D')
			neighbors.push([node.x - 1, node.y]);
		if (node.x < this.nodes[0].length - 1 && this.nodes[node.x + 1][node.y] !== 'D')
			neighbors.push([node.x + 1, node.y]);
		if (node.y > 1 && this.nodes[node.x][node.y - 1] !== 'D')
			neighbors.push([node.x][node.y - 1]);
		if (node.y < this.nodes.length - 1 && this.nodes[node.x][node.y + 1] !== 'D')
			neighbors.push(this.nodes[node.x][node.y + 1]);
	}

	cost() {
		return 1;
	}
};
