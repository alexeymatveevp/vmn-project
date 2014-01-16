window.nodeMap = new Object()
window.maxdepth = 0
window.treeMap = new Object()

function doit() {
	$.ajax({
		url: "skills",
	}).done(function(data) {
		makeTree(eval(data))
		renderTree()
	});
}

function makeTree(skills) {
	var nodeList = []
	for (i in skills) {
		var node = skills[i]
		window.nodeMap[node.name] = node
	}
	for (index in skills) {
		var parents = findParentRecursive(skills[index].name,[],0)
		if (!window.treeMap[window.maxdepth]) {
			window.treeMap[window.maxdepth] = []
		}
		window.treeMap[window.maxdepth].push(skills[index].name)
		window.maxdepth = 0
	}
}

function findParentRecursive(nodeName, list, depth) {
	var parents = window.nodeMap[nodeName].parent
	if (parents.length != 0) {
		depth++
		if (window.maxdepth < depth) {
			window.maxdepth = depth
		}
		for (i in parents) {
			list.push(parents[i])
			list = list.concat(findParentRecursive(parents[i],list,depth)).filter(onlyUnique)
		}
	}
	return list
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function renderTree() {
	var tree = window.treeMap
	for (i in tree) {
		console.log(i)
	}
}