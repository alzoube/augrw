function drawWord(word){


    canvasImg = getCanvasImg(canvas);
    console.log("Write the  word");

    //var context = canvas.getContext("2d");
    
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // redraw canvas before path
    context.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);

    //Draw word
    context.beginPath();
    context.font = "180pt Calibri";
    context.fillStyle = "white";
    context.strokeStyle = "blue";
    context.textAlign = "center";
    context.lineWidth = 2;
    // align text vertically center
    context.textBaseline = "middle";
    //context.fillText(word, canvas.width / 2, 100);
    context.strokeText(word, canvas.width / 2, 120);
}

function addPoint(events, points){

    //console.log("add point");

    //var context = events.getContext();//?????
    var drawingPos = events.getMousePos();
    
    if (drawingPos !== null) {
        points.push(drawingPos);
    }
}

function drawPath( points, canvasImg){

    //console.log("draw path");

    var context = canvas.getContext("2d");
    
    // redraw canvas before path
    context.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);
    
    // draw patch
    context.beginPath();
    context.lineTo(points[0].x, points[0].y);
    for (var n = 1; n < points.length; n++) {
        var point = points[n];
        context.lineTo(point.x, point.y);
    }
    context.stroke();
}

// function updateColorSquare(){
//     var red = document.getElementById("red").value;
//     var green = document.getElementById("green").value;
//     var blue = document.getElementById("blue").value;
    
//     var colorSquare = document.getElementById("colorSquare");
//     colorSquare.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
// }

function getCanvasImg(canvas){

    //console.log("get image");
    var img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

window.onload = function(){
var events = new Events("myCanvas");
canvas = events.getCanvas();
context = events.getContext();
var isMouseDown = false;
var canvasImg = getCanvasImg(canvas);
var points = [];


document.getElementById("clearButton").addEventListener("click", function(evt){
    events.clear();
    points = [];
    canvasImg = getCanvasImg(canvas);
}, false);


canvas.addEventListener("mousedown", function(){

    //console.log("down");

    var drawingPos = events.getMousePos();
    
    // update drawing params

    size = document.getElementById("textsize").value;
    
    // start drawing path

    context.strokeStyle = document.getElementById("clr").value;

    context.lineWidth = size;
    context.lineJoin = "round";
    context.lineCap = "round";
    addPoint(events, points);
    isMouseDown = true;
}, false);

canvas.addEventListener("mouseup", function(){

    //console.log("up");

    isMouseDown = false;
    if (points.length > 0) {
        drawPath( points, canvasImg);
        // reset points
        points = [];
    }
    canvasImg = getCanvasImg(this);
}, false);

canvas.addEventListener("mouseout", function(){

    //console.log("out");

    if (document.createEvent) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent("mouseup", true, false);
        this.dispatchEvent(evt);
    }
    else {
        this.fireEvent("onmouseup");
    }
}, false);
          
//drawWord(canvas, "PSUT", canvasImg);

events.setStage(function(){
    //console.log("set stage");
    if (isMouseDown) {

        addPoint(this, points);
        drawPath( points, canvasImg);
    }
});
};