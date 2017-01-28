$( document ).ready(function() {
  var canvas = document.getElementById("drawboard");
  var context = canvas.getContext("2d");
  var xStart = 0;
  var yStart = 0;


  //slider for size
  $(".size-track").slider({
      value: settings.size,
      min: 0,
      max: 100
  });


  $( "#drawboard" ).mousedown(function(e) {
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    //return object if it is under the mouse
    var selectObj = selectObject(x,y);

    //if object is under the mouse, it is selected, instead of
    //trying to make a new object in that space
    if (selectObj != undefined) {
      settings.selected = true;
      settings.currentShape = selectObj;
      $( "#colorselect" ).val(settings.currentShape.color);
    }
    //no object under mouse, new one is to be created.
    else {
      settings.isDrawing = true;
      var shape = undefined;

      if (settings.nextObject === "Rectangle") {
        shape = new Rectangle(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Circle") {
        shape = new Circle(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Line") {
        shape = new Line(x,y,settings.nextColor);
      }
      //text needs to be pushed immediatly as it is created only
      //by one mousedown, and it not resized by mouse movements
      else if (settings.nextObject === "Text") {
        shape = new Text(x,y,settings.nextColor);
      }
      else if (settings.nextObject === "Pen") {
        shape = new Pen(x,y,settings.nextColor);
      }

      //current shape is stored as reference in settings for
      //later use
      settings.currentShape = shape;
    }

  });

  $( "#drawboard" ).mouseup(function(e) {
    //items are only pushed to the shapes list if it is not selected
    //for movement.
    if (settings.isDrawing && !settings.selected) {
      //console.log("pushed");
      settings.shapes.push(settings.currentShape);
    }
    settings.isDrawing = false;
    settings.selected = false;
    drawAll();

  });
  $( "#drawboard" ).mousemove(function(e) {
    var currShape = settings.currentShape;
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    if (currShape != undefined && settings.selected){
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

  function displayVals() {
    var value = $( "#shapeselect" ).val();
    settings.nextObject = value;
  }

  $("#shapeselect").change(displayVals);
  displayVals();

  function colorVals() {
    var value = $( "#colorselect" ).val();
    settings.nextColor = value;
    if(settings.selected == true) {
      drawCurrent();
    }
  }

  $("#colorselect").change(colorVals);

  $( "#undo" ).click(function() {
    if (settings.shapes.length > 0) {
      settings.redoShapes.push(settings.shapes.pop());
      drawAll();
    }
  });
  $( "#redo" ).click(function() {
    if (settings.redoShapes.length > 0) {
      settings.shapes.push(settings.redoShapes.pop());
      drawAll();
    }
  });

  $( "#clear" ).click(function() {
    clearDrawArrays();
    drawAll();
  });

  function textVals() {
    var value = $( "#textWrite" ).val();
    settings.currentText = value;
  }

  $("#textWrite").change(textVals);

  function thicknessVals() {
    var value = $( ".size-track" ).val();
    settings.size = value;
    console.log("hi " + value);
  }

  $(".size-track").change(thicknessVals);

  $( "#save" ).click(function() {
      save(settings.shapes,"hi");
    });

  $( "#load" ).click(function() {
      loadSaved();
    });

});
