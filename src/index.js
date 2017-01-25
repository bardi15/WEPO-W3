tmpList = [];

$( document ).ready(function() {
  var canvas = document.getElementById("drawboard");
  var context = canvas.getContext("2d");
  var xStart = 0;
  var yStart = 0;

  $( "#drawboard" ).mousedown(function(e) {
    console.log("mousedown");
    settings.isDrawing = true;
    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");

    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    if (settings.nextObject === "Rectangle") {
      shape = new Rectangle(x,y,10);
    }

    settings.currentShape = shape;


  });

  $( "#drawboard" ).mouseup(function(e) {
    //console.log("mouseup");
    settings.isDrawing = false;
    settings.shapes.push(settings.currentShape);
    drawAll();

  });
  $( "#drawboard" ).mousemove(function(e) {
    //console.log("mousemove");
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    if (settings.isDrawing) {
      settings.currentShape.setEnd(x,y);
      drawCurrent();
    }
    var k = settings.currentShape;
    //console.log(k.x,k.y,k.endX,k.endY);
  });

  $( "#drawboard" ).dblclick(function(e) {
    var k = settings.currentShape;

    console.log(k.x,k.y,k.endX,k.endY);


  });

});
