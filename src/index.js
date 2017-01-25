tmpList = [];

$( document ).ready(function() {
  var canvas = document.getElementById("drawboard");
  var context = canvas.getContext("2d");
  var xStart = 0;
  var yStart = 0;

  $( "#drawboard" ).dblclick(function(e) {
    unSelectAll();
    console.log("mousedown");
    settings.isDrawing = true;
    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");

    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    if (settings.nextObject === "Rectangle") {
      shape = new Rectangle(x,y,settings.nextColor);
    }
    else if (settings.nextObject === "Circle") {
      shape = new Circle(x,y,settings.nextColor);
    }
    else if (settings.nextObject === "Line") {
      shape = new Circle(x,y,settings.nextColor);
    }

    settings.currentShape = shape;


  });

  $( "#drawboard" ).mouseup(function(e) {
    //console.log("mouseup");
    unSelectAll();
    if (settings.isDrawing) {
      settings.shapes.push(settings.currentShape);
    }
    settings.isDrawing = false;
    drawAll();

  });
  $( "#drawboard" ).mousemove(function(e) {
    //console.log("mousemove");
    var currShape = settings.currentShape;
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    if(currShape != undefined && currShape.selected){
      console.log("selected");
      var currWidth = currShape.endX - currShape.x;
      var currHeight = currShape.endY - currShape.y;
      console.log(currWidth, currHeight);
      currShape.x = x;
      currShape.y = y;
      currShape.endX = currWidth + x;
      currShape.endY = currHeight + y;

      drawAll();
    }
    else {
      if (settings.isDrawing) {
        currShape.setEnd(x,y);
        drawCurrent();
      }
      var k = currShape;
      //console.log(k.x,k.y,k.endX,k.endY);
    }

  });

  $( "#drawboard" ).mousedown(function(e) {
    unSelectAll();
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    selectObject(x,y);

  });

  function displayVals() {
    var value = $( "#shapeselect" ).val();
    //$("p").html( "<b>Single:</b> " + singleValues);
    if (value === "Rectangle"){
      settings.nextObject = "Rectangle"
    }
    else if (value === "Circle"){
      settings.nextObject = "Circle"
    }
    else {
      settings.nextObject = "Line"
    }
  }

  $("#shapeselect").change(displayVals);
  displayVals();


});
