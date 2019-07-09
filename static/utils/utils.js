"use strict";

function drawText(t, x, y, w) {
    var c = document.getElementById("shareCanvas");
    var ctx = c.getContext("2d");
    var chr = t.split("");
    var temp = "";
    var row = [];

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w) {
            ;
        } else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 20);
    }
}

module.exports = {
    drawText: drawText
};