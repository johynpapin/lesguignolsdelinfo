module.exports = exports = class Graph {
	constructor(nodes, size) {
		this.nodes = nodes;
	}

	neighbors(node) {
		let ns = [];
		if (node.x > 1 && this.nodes[node.x - 1][node.y] !== 'D') {
			ns.push({x: node.x - 1, y: node.y});
		}
		if (node.x < this.nodes.length - 1 && this.nodes[node.x + 1][node.y] !== 'D') {
			ns.push({x: node.x + 1, y: node.y});
		}
		if (node.y > 1 && this.nodes[node.x][node.y - 1] !== 'D') {
			ns.push({x: node.x, y: node.y - 1});
		}
		if (node.y < this.nodes[0].length - 1 && this.nodes[node.x][node.y + 1] !== 'D') {
			ns.push({x: node.x, y: node.y + 1});
		}
		return ns;
	}

	cost() {
		return 1;
	}
};
