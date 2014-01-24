$(function() {

    $.ajax({
        url: "skills",
    }).done(function(data) {
        var skills = eval(data)
        for (i in skills) {
            var skill = skills[i]
            var p = $('<p></p>')
            p.css('position', 'absolute')
            p.attr('id', skill.name)
            p.html(skill.name)
            $('#skill_tree').append(p)
        }
        makeTree(skills)
        renderTree()
        renderArrows()
    });

})

function renderTree() {
    $('#skill_tree p').each(function() {
        $(this).css('top', 10 + getLevel(this.id) * 180)
        if (getNodesAtLevel(this.id) == 1) {
            $(this).css('left', 200 + 800 / 2)
        } else {
            $(this).css('left', 200 + 800 / getNodesAtLevel(this.id) * getIndexOnLevel(this.id))
        }
        $(this).draggable({
            drag: function(event, ui) {
                //ui.position.left = x;
                //ui.position.top = y;
            }
        });
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

function getNodesAtLevel(nodeName) {
    for (i in window.treeMap) {
        if (window.treeMap[i].indexOf(nodeName) != -1) {
            return window.treeMap[i].length
        }
    }
}

function getIndexOnLevel(nodeName) {
    for (i in window.treeMap) {
        if (window.treeMap[i].indexOf(nodeName) != -1) {
            return window.treeMap[i].indexOf(nodeName)
        }
    }
}