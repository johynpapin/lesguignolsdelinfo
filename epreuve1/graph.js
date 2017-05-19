module.exports = exports = class Graph {
	constructor(nodes, size) {
		this.nodes = nodes;
		this.size = size
	}

	neighbors(node) {
		let ns = [];
		if (node.x > 1 && this.nodes[JSON.stringify({x: node.x - 1, y: node.y})] !== 'D') {
			ns.push({x: node.x - 1, y: node.y});
		}
		if (node.x < this.size.x - 1 && this.nodes[JSON.stringify({x: node.x + 1, y: node.y})] !== 'D') {
			ns.push({x: node.x + 1, y: node.y});
		}
		if (node.y > 1 && this.nodes[JSON.stringify({x: node.x, y: node.y - 1})] !== 'D') {
			ns.push({x: node.x, y: node.y - 1});
		}
		if (node.y < this.size.y - 1 && this.nodes[JSON.stringify({x: node.x, y: node.y + 1})] !== 'D') {
			ns.push({x: node.x, y: node.y + 1});
		}
		return ns;
	}

	cost() {
		return 1;
	}
};
