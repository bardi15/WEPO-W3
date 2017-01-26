
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.endX = x;
    this.endY = y;
    this.color = settings.nextColor;
    this.selected=false;
    this.currentText="";
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
    //this.color = settings.nextColor;
  }

  draw(context) {
    //console.log(context);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
    if (this.selected) {
      //console.log("selected");
      context.strokeStyle = "red";
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
    var xEnd = this.endX - this.x;
    if (xEnd < 0) {
      xEnd = 0;
    }
    var yEnd = this.endY - this.y
    if (yEnd < 0) {
      yEnd = 0;
    }
    context.beginPath();
    context.arc(this.x, this.y, xEnd, yEnd, 0, 2* Math.PI);
    context.fillStyle = this.color;
    context.fill();
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
    context.strokeStyle = this.color;
    context.stroke();
  }
}

class Text extends Shape {
  constructor(x, y, color) {
    super(x,y,color);

    this.currentText = settings.currentText;
    //this.color = this.nextColor;
    //console.log("hi " + this.currentText);
  }

  draw(context) {
    var size = 30;
    context.font = size + "px Arial";
    context.fillStyle = this.color;
    context.fillText(this.currentText,this.x, this.y);
    var w = context.measureText(this.currentText).width;
    var h = context.measureText('M').width;

    var nY = this.y - h;

    this.endX = this.x + h;
    this.endY = this.y + w;

    //dummyDraw(this.x, nY , this.endX, this.endY);
  }
}

class Pen extends Shape {
  constructor(x, y, color) {
    super(x,y,color);
  }

  draw(context) {
    context.lineTo(this.endX, this.endY);
    context.stroke();
    //context.closePath();
    //console.log("x: ", this.x, "y: ", this.y, "eX: ", this.endX, "eY: ", this.endY);
  }
}

var settings = {
  canvasObj: document.getElementById("drawboard"),
  nextObject: "Rectangle",
  nextColor: "black",
  currentShape: undefined,
  currentText: "",
  shapes: [],
  redoShapes: [],
  isDrawing: false,
  selected: false,
  movingObject: false
};

/*
function getTextSize(font,text){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.font="30px Arial";
  var txt="Hello World"
  ctx.fillText("width:" + ctx.measureText(txt).width,10,50)
  ctx.fillText(txt,10,100);
}
*/
function drawCurrent() {
  drawAll();
  var context = settings.canvasObj.getContext("2d");

  settings.currentShape.draw(context);
}

function drawAll() {
  clear();
  var context = settings.canvasObj.getContext("2d");
  settings.shapes.forEach(function(obj){
    obj.draw(context);
    //console.log(obj);
  });

}

function dummyDraw(x,y,x1,y1) {
  var context = settings.canvasObj.getContext("2d");
  context.fillStyle = "black";
  context.fillRect(x, y, x1, y1);
}

function clear() {
  var context = settings.canvasObj.getContext("2d");
  context.clearRect(0,0,800,600);
}

function selectObject(cursorX,cursorY) {
  console.log("count: " + settings.shapes.length);
  var returnValue = false;
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
        returnValue = true;
      }
    else {
      console.log("FALSE");
    }

  });
  return returnValue;
}

function unSelectAll() {
  settings.shapes.forEach(function(obj){
    obj.selected = false;
  });
}

function moveObject(currShape,x,y) {
  console.log("moving in objects");
  var currWidth = currShape.endX - currShape.x;
  var currHeight = currShape.endY - currShape.y;
  currShape.x = x;
  currShape.y = y;
  currShape.endX = currWidth + x;
  currShape.endY = currHeight + y;
}
