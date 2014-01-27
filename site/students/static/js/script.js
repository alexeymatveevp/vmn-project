$(function() {
    $.ajax({
        url: "skills.json",
    }).done(function(data) {
        var skills = data
        for (i in skills) {
            var skill = skills[i]
            var skillNode = $('<div class="alert alert-info skill-block"><a href="#" class="alert-link"></a></div>')
            var skillLink = $('<a href="/skill/' + skill.name + '" class="alert-link"></a>')
            skillNode.attr('id', skill.name)
            skillLink.html(skill.name)
            skillNode.html(skillLink)
            $('#skill_tree').append(skillNode)
        }
        // $("#mainCanvas").width($('#skill_tree').width())
        $("#mainCanvas").css('top',$('#breadcrumbs').height())
        makeTree(skills)
        renderTree()
        renderArrows()
    })

    $('#studentVika').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentProgress('Vika')
        return false
    })
    $('#studentMarina').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentProgress('Marina')
        return false
    })
    $('#studentNatasha').click(function() {
        $(this).parent().parent().find('li').removeClass('active')
        $(this).parent().addClass('active')
        toogleStudentProgress('Natasha')
        return false
    })
})

function toogleStudentProgress(studentName) {
    $.ajax({
        url: "student/" + studentName,
    }).done(function(data) {
        console.log(data)
        var learnedSkills = data.skills
        for (node in nodeMap) {
            $('#'+node).removeClass('alert-success')
            $('#'+node).addClass('alert-info')
            for (ind in learnedSkills) {
                if (node == learnedSkills[ind]) {
                    $('#'+node).removeClass('alert-info')
                    $('#'+node).addClass('alert-success')
                    console.log(node)
                }
            }
        }
    })   
}

function renderTree() {
    $('#skill_tree div').each(function() {
        $(this).css('top', 10 + getLevel(this.id) * 180)
        if (getNodesAtLevel(this.id) == 1) {
            $(this).css('left', 200 + 800 / 2)
        } else {
            $(this).css('left', 200 + 800 / getNodesAtLevel(this.id) * getIndexOnLevel(this.id))
        }
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