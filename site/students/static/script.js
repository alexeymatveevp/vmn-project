$(function() {
	$.ajax({
		url: "skills",
	}).done(function(data) {
		var skills = eval(data)	
		for (i in skills) {
			var skill = skills[i]
			var p = $('<p></p>')
			p.addClass('block')
			p.css('position', 'absolute')
			p.attr('id',skill.name)
			p.addClass('draggable')
			p.html(skill.name)
			$('#skill_tree').append(p)

			for (j in skill.parent) {
				var parent = skill.parent[j]
				var con = $('<div class="connector"></div>')
				var img = $('<img src="/static/arrow.gif" class="connector-end"></img>')
				// var label = $('<label class="source-label">start</label>')
				con.append(img)
				// con.append(label)
				con.addClass(parent)
				con.addClass(skill.name)
				con.addClass("down_end")
				$('#skill_tree').append(con)
			}

		}
		makeTree(skills)
		renderTree()
		initPageObjects()
	});
});

function renderTree() {
	$('#skill_tree p.block').each(function() {
		$(this).css('top',10 + getLevel(this.id) * 50)
	})

}

function getLevel(nodeName) {
	var tree = window.treeMap
	for (i in tree) {
		for (j in tree[i]) {
			if (tree[i][j] == nodeName) {
				return i
			}
		}
	}
}