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

function renderArrows() {
    var ctx = document.getElementById('mainCanvas').getContext('2d');

    for (var i = 0; i < 20; ++i) randomCircle(ctx, '#999');

    //var start = randomDiamond(ctx, '#060');
    //var end = randomDiamond(ctx, '#600');
    //console.log(start)
    //console.log(end)
    ctx.lineWidth = 2;
    ctx.fillStyle = ctx.strokeStyle = '#099';
    //arrow(ctx,start, end,10);
    var from = new Object()
    var to = new Object()
    for (nodeName in nodeMap) {
        var node = nodeMap[nodeName]
        if (node.child != []) {
            var top1 = $('#' + nodeName).offset().top
            var h1 = $('#' + nodeName).height()
            var x1 = $('#' + nodeName).offset().left + $('#' + nodeName).width() / 2
            var y1 = top1 + h1 / 2
            for (j in node.child) {
                var top2 = $('#' + node.child[j]).offset().top
                var x2 = $('#' + node.child[j]).offset().left + $('#' + node.child[j]).width() / 2
                var y2 = top2 + $('#' + node.child[j]).height() / 2
                // line equation (see photo)
                var fromy = top1 + h1
                var fromx = x1 + ((fromy - y1) * (x2 - x1)) / (y2 - y1)
                var toy = top2
                var tox = x1 + ((toy - y1) * (x2 - x1)) / (y2 - y1)
                arrow(ctx, {
                    x: fromx,
                    y: fromy
                }, {
                    x: tox,
                    y: toy
                }, 7)
            }
        }
    }
    arrow(ctx, {
        x: 100,
        y: 200
    }, {
        x: 150,
        y: 270
    }, 10);
}



function arrow(ctx, p1, p2, size) {
    ctx.save();

    //var points = edges(ctx,p1,p2);
    //if (points.length < 2) return 
    //p1 = points[0], p2=points[points.length-1];

    // Rotate the context to point along the path
    var dx = p2.x - p1.x,
        dy = p2.y - p1.y,
        len = Math.sqrt(dx * dx + dy * dy);
    //var dx = 5, dy=100, len=Math.sqrt(dx*dx+dy*dy);
    ctx.translate(p2.x, p2.y);
    ctx.rotate(Math.atan2(dy, dx));

    // line
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-len, 0);
    ctx.closePath();
    ctx.stroke();

    // arrowhead
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size);
    ctx.lineTo(-size, size);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// Find all transparent/opaque transitions between two points
// Uses http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
function edges(ctx, p1, p2, cutoff) {
    if (!cutoff) cutoff = 220; // alpha threshold
    var dx = Math.abs(p2.x - p1.x),
        dy = Math.abs(p2.y - p1.y),
        sx = p2.x > p1.x ? 1 : -1,
        sy = p2.y > p1.y ? 1 : -1;
    var x0 = Math.min(p1.x, p2.x),
        y0 = Math.min(p1.y, p2.y);
    var pixels = ctx.getImageData(x0, y0, dx + 1, dy + 1).data;
    var hits = [],
        over = null;
    for (x = p1.x, y = p1.y, e = dx - dy; x != p2.x || y != p2.y;) {
        var alpha = pixels[((y - y0) * (dx + 1) + x - x0) * 4 + 3];
        if (over != null && (over ? alpha < cutoff : alpha >= cutoff)) {
            hits.push({
                x: x,
                y: y
            });
        }
        var e2 = 2 * e;
        if (e2 > -dy) {
            e -= dy;
            x += sx
        }
        if (e2 < dx) {
            e += dx;
            y += sy
        }
        over = alpha >= cutoff;
    }
    return hits;
}

function randomDiamond(ctx, color) {
    var x = Math.round(Math.random() * (ctx.canvas.width - 100) + 50),
        y = Math.round(Math.random() * (ctx.canvas.height - 100) + 50);
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI);
    var scale = Math.random() * 0.8 + 0.4;
    ctx.scale(scale, scale);
    ctx.lineWidth = 5 / scale;
    ctx.fillRect(-50, -50, 100, 100);
    ctx.strokeRect(-50, -50, 100, 100);
    ctx.restore();
    return {
        x: x,
        y: y
    };
}

function randomCircle(ctx, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
        Math.round(Math.random() * (ctx.canvas.width - 100) + 50),
        Math.round(Math.random() * (ctx.canvas.height - 100) + 50),
        Math.random() * 20 + 10,
        0, Math.PI * 2, false
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}