
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.endX = x;
    this.endY = y;
    this.color=color;
    this.selected=false;
  }
  setEnd(x,y) {
    this.endX = x;
    this.endY = y;
  }
  draw() {
  //  var c = document.getElementById("canvas");
  //  var ctx = c.getContext("2d");
  //  ctx.fillStyle="#FF0000";
  //  ctx.fillRect(_x,_y,150,100);
  }
}

class Rectangle extends Shape {
  constructor(x, y, color) {
    super(x,y,color);
  }

  draw(context) {
    //console.log(context);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
    if (this.selected) {
      context.strokeStyle = "#0000ff";
      context.lineWidth   = 5;
      context.strokeRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
    }
  }
}

class Circle extends Shape {
  constructor(x, y, color) {
    super(x,y,color);
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.endX - this.x, this.endY - this.y, 0, 2* Math.PI);
    context.stroke();
  }
}

class Line extends Shape {
  constructor(x, y, color) {
    super(x,y,color);
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.endX,this.endY);
    context.stroke();
  }
}

var settings = {
  canvasObj: document.getElementById("drawboard"),
  nextObject: "Rectangle",
  nextColor: "red",
  currentShape: undefined,
  shapes: [],
  isDrawing: false
};

function drawCurrent() {
  var context = settings.canvasObj.getContext("2d");
  //clear()
  settings.currentShape.draw(context);
}

function drawAll() {
  clear()
  var context = settings.canvasObj.getContext("2d");
  settings.shapes.forEach(function(obj){
    obj.draw(context);
  });
}

function clear() {
  var context = settings.canvasObj.getContext("2d");
  context.clearRect(0,0,800,600);
}

function selectObject(cursorX,cursorY) {
  settings.shapes.forEach(function(obj) {
    var x1 = obj.x;
    var y1 = obj.y;
    var x2 = obj.endX;
    var y2 = obj.endY;
    console.log("x1: " + x1 + " y1: " + y1 + " x2:" + x2 + " y2: " + y2 + " cX: " + cursorX + " cY: " + cursorY);
    if ((x1 <= cursorX && x2 >= cursorX) &&
      ((y1 <= cursorY && y2 >= cursorY))) {
        console.log("TRUE");
        obj.selected = true;
        settings.currShape = obj;
        return;
      }
    else {
      console.log("FALSE");
    }
    console.log(obj);
  });
}

function unSelectAll() {
  settings.shapes.forEach(function(obj){
    obj.selected = false;
  });
}

/*
$( "#drawboard" ).mousedown(function(e) {
  console.log("mousedown");
  var shape = undefined;
  var context = settings.canvasObj.getContext("2d");

  if (settings.nextObject === "Rectangle") {
    shape = new Rectangle(10,10,10);
  }

  settings.currentShape = shape;
  settings.shapes.push(shape);

});

$( "#drawboard" ).mouseup(function(e) {
  isDrawing = false;
  console.log(e);

});
$( "#drawboard" ).mousemove(function(e) {
  if (settings.currentShape !== undefined) {
    settings.currentShape.set
  }
});

function drawAll() {
  var context = settings.canvasObj.getContext("2d");
  //Todo clear canvasOb
  //todo draw
}
*/
