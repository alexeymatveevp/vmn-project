var TOP_OFFSET = -76-56

function renderArrows() {
    var ctx = document.getElementById('mainCanvas').getContext('2d');

    //for (var i = 0; i < 20; ++i) randomCircle(ctx, '#999');

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
            var top1 = $('#' + nodeName).offset().top + TOP_OFFSET
            var h1 = $('#' + nodeName).height()
            var x1 = $('#' + nodeName).offset().left + $('#' + nodeName).width() / 2
            var y1 = top1 + h1 / 2
            for (j in node.child) {
                var top2 = $('#' + node.child[j]).offset().top + TOP_OFFSET
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
    // arrow(ctx, {
    //     x: 100,
    //     y: 200
    // }, {
    //     x: 150,
    //     y: 270
    // }, 10);
}



function arrow(ctx, p1, p2, size) {
    ctx.save();

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