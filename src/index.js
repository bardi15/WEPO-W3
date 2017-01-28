$( document ).ready(function() {
  var canvas = document.getElementById("drawboard");
  var context = canvas.getContext("2d");
  var xStart = 0;
  var yStart = 0;


  var m = $(".size-track").slider({
      value: settings.size,
      min: 0,
      max: 100
  });


  $( "#drawboard" ).mousedown(function(e) {
    var kk = m.slider("getValue");
    console.log(kk);

    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    //return object if it is under the mouse
    var selectObj = selectObject(x,y);

    //if object is under the mouse, it is selected, instead of
    //trying to make a new object in that space
    if (selectObj != undefined) {
    //  console.log("object is here...");
      settings.selected = true;
      settings.currentShape = selectObj;
  //    console.log(settings.currentShape.color);
      $( "#colorselect" ).val(settings.currentShape.color);
    }
    //no object under mouse, new one is to be created.
    else {
      settings.isDrawing = true;
      //settings.selected = false;
      var shape = undefined;
      //var context = settings.canvasObj.getContext("2d");

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
      //text needs to be pushed immediatly as it is created only
      //by one mousedown, and it not resized by mouse movements
      else if (settings.nextObject === "Text") {
        shape = new Text(x,y,settings.nextColor);
        //settings.shapes.push(shape);
      }
      else if (settings.nextObject === "Pen") {
        //console.log("in nxt: ", x,y);
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

  function displayVals() {
    var value = $( "#shapeselect" ).val();
    settings.nextObject = value;
  }

  $("#shapeselect").change(displayVals);
  displayVals();

  function colorVals() {
    var value = $( "#colorselect" ).val();
    //console.log(settings);
    settings.nextColor = value;
    //settings.currentShape.color = value;
    if(settings.selected == true) {
    //  console.log("changes to color.....");
      //settings.currentShape.color = value;
      drawCurrent();
    }
  //  console.log("touch");
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
  //textVals();

/*  function fontVals() {
    var value = $( "#fontSize" ).val();
    settings.size = value;
  }

  $("#fontSize").change(fontVals);
  fontVals();*/

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
