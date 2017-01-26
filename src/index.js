tmpList = [];

$( document ).ready(function() {
  var canvas = document.getElementById("drawboard");
  var context = canvas.getContext("2d");
  var xStart = 0;
  var yStart = 0;



  $( "#drawboard" ).mousedown(function(e) {
    unSelectAll();
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;

    if (selectObject(x,y)) {
      console.log("object is here...");
      settings.selected = true;
    }
    else {
      settings.isDrawing = true;
      settings.selected = false;
      var shape = undefined;
      var context = settings.canvasObj.getContext("2d");

      //context.moveTo(x,y);
      if (settings.nextObject === "Rectangle") {
        shape = new Rectangle(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Circle") {
        shape = new Circle(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Line") {
        shape = new Line(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Text") {
        shape = new Text(x,y,settings.nextColor);
        settings.shapes.push(shape);
      }
      else if (settings.nextObject === "Pen") {
        //console.log("in nxt: ", x,y);
        shape = new Pen(x,y,settings.nextColor);
      }
      settings.currentShape = shape;
    }

  });

  $( "#drawboard" ).mouseup(function(e) {
    unSelectAll();
    if (settings.isDrawing && !settings.selected) {
      console.log("pushed");
      settings.shapes.push(settings.currentShape);
    }
    settings.isDrawing = false;
    settings.selected = false;
    drawAll();

  });
  $( "#drawboard" ).mousemove(function(e) {
    //console.log(settings.nextColor);
    var currShape = settings.currentShape;
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    //if(currShape != undefined && currShape.selected){
    if (currShape != undefined && settings.selected){
      //console.log("moving object..");
      moveObject(currShape,x,y);
      drawCurrent();
    }
    else {
      if (settings.isDrawing) {
        currShape.setEnd(x,y);
        drawCurrent();
      }
    }
  });

/*  $( "#drawboard" ).dblclick(function(e) {
    unSelectAll();
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    settings.selected = true;
    //console.log("actual click: " + x + " , "+ y);
    selectObject(x,y);
  });*/

  function displayVals() {
    var value = $( "#shapeselect" ).val();
    settings.nextObject = value;
  }

  $("#shapeselect").change(displayVals);
  displayVals();

  function colorVals() {
    var value = $( "#colorselect" ).val();
    settings.nextColor = value;
  }

  $("#colorselect").change(colorVals);

  $( "#undo" ).click(function() {
    if (settings.shapes.length > 0) {
      $("#redo").removeClass("greyout")
      settings.redoShapes.push(settings.shapes.pop());
      drawAll();
    }
    else {
      $("#undo").addClass("greyout")
    }
  });
  $( "#redo" ).click(function() {
    if (settings.redoShapes.length > 0) {
      $("#undo").removeClass("greyout")
      settings.shapes.push(settings.redoShapes.pop());
      drawAll();
    }
    else {
      $("#redo").addClass("greyout")
    }
  });

  function textVals() {
    var value = $( "#textWrite" ).val();
    settings.currentText = value;
  }

  $("#textWrite").change(textVals);
  textVals();
});
