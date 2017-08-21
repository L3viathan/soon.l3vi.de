ts = window.location.href.split("?")[1]
if (ts) {
    var targetDate = new Date(+window.location.href.split("?")[1])
} else {
    // months are 0-indexed, days 1-indexed. because lol javascript.
    var targetDate = new Date(2017, 4, 20, 11, 0, 0);
}
var fullDays = 30;

function load() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.translate(300, 300);
    ctx.lineWidth = 35;
    ctx.lineCap = "round";
    var capra = new Image();
    capra.onload = function() {
        newframe(ctx, capra);
    };
    capra.src = "vulpes.png";
    var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(255,0,0,0.45)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
}

function newframe(ctx, capra) {

    var diffDate = +new Date(targetDate - new Date());
    if(diffDate < 0) diffDate = 0;
    var days = diffDate / 86400000; //(1000*60*60*24);
    var hours = (diffDate / 3600000) % 24; //(1000*60*60)) % 24;
    var minutes = (diffDate / 60000) % 60;
    var seconds = (diffDate / 1000) % 60;
    var milliseconds = (seconds % 1) * 1000;

    var grapct = seconds % 1;
    if(seconds % 2 < 1) grapct = 1-grapct;
    grapct = grapct/4

    var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(255,0,0," + (grapct+0.4) + ")");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;

    ctx.clearRect(-300, -300, 600, 600);
    ctx.fillRect(-300, -300, 600, 600);

    ctx.rotate(-(seconds / 30) * Math.PI);
    ctx.drawImage(capra, -100, -100);
    ctx.rotate((seconds / 30) * Math.PI);

    if (diffDate < 0) {
        drawPercent(ctx, 1, 130, "#94481f");
        drawPercent(ctx, 1, 170, "#a95324");
        drawPercent(ctx, 1, 210, "#be5d28");
        drawPercent(ctx, 1, 250, "#d3672d");
        //drawPercent(ctx,1,290, "#d77742");

        document.title = "";
        return;
    }
    if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) {
        drawPercent(ctx, 1 - (seconds % 1), 130, "#1f6b94");
    } else {
      	drawPercent(ctx, days / fullDays, 130, "#1f6b94");
    }
    if (hours < 1 && minutes < 1 && seconds < 1) {
        drawPercent(ctx, 1 - (seconds % 1), 170, "#247aa9");
    } else {
        drawPercent(ctx, hours / 24, 170, "#247aa9");
    }
    if (minutes < 1 && seconds < 1) {
        drawPercent(ctx, 1 - (seconds % 1), 210, "#2889be");
    } else {
        drawPercent(ctx, minutes / 60, 210, "#2889be");
    }
    if (seconds < 1) {
        drawPercent(ctx, 1 - (seconds % 1), 250, "#2d98d3");
    } else {
        drawPercent(ctx, seconds / 60, 250, "#2d98d3");
    }

    f=Math.floor;

    document.title = "P" + (days > 1 ? f(days) + "DT" : "T") + (days > 1 || hours > 1 ? f(hours) + "H" : "") + (days > 1 || hours > 1 || minutes > 1 ? f(minutes) + "M" : "") + f(seconds) + "S";

    requestAnimationFrame(function() {
        newframe(ctx, capra);
    });
}

function drawPercent(ctx, percent, radius, color) {
    if (!radius) radius = 50;
    if (!color) color = "#ff0000";
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, radius, -(Math.PI / 2), (percent * 2 * Math.PI) - (Math.PI / 2), false);
    ctx.stroke();
}
