
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.endX = x;
    this.endY = y;
    this.color=color;
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
  clear()
  settings.currentShape.draw(context);
}

function drawAll() {
  clear()
  var context = settings.canvasObj.getContext("2d");

  //console.log(settings.shapes.length);
  settings.shapes.forEach(function(word){
    word.draw(context);
  });
}

function clear() {
  var context = settings.canvasObj.getContext("2d");
  context.clearRect(0,0,500,500);
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
