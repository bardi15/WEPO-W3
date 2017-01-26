
//constantly draws item that is being created, while maintaing items that came
//previously
function drawCurrent() {
  //draws background(existing items)
  drawAll();
  //draws item that is being modified
  var context = settings.canvasObj.getContext("2d");
  settings.currentShape.draw(context);
}

//draws all existing shapes
function drawAll() {
  //clears canvas
  clear();
  var context = settings.canvasObj.getContext("2d");
  //draws all objects that have previously been created
  settings.shapes.forEach(function(obj){
    obj.draw(context);
    //console.log(obj);
  });

}

//test function, REMOVE!!
function dummyDraw(x,y,x1,y1) {
  var context = settings.canvasObj.getContext("2d");
  context.fillStyle = "black";
  context.fillRect(x, y, x1, y1);
}

//clears canvas
function clear() {
  var context = settings.canvasObj.getContext("2d");
  context.clearRect(0,0,800,600);
}

//if mousedown event, this function will check if an object is "below"
//the mouse at that time
function selectObject(cursorX,cursorY) {
  var returnValue = undefined;
  //goes through all existing shapes, to se if they are below the mouse
  settings.shapes.forEach(function(obj) {
    var x1 = obj.x;
    var y1 = obj.y;
    var x2 = obj.endX;
    var y2 = obj.endY;
    //checks if current mouse coordinates are within bounds of object
    if ((x1 <= cursorX && x2 >= cursorX) &&
      ((y1 <= cursorY && y2 >= cursorY))) {
        //obj.selected = false;
        returnValue = obj;
      }
    else {
      //obj.selected = false;
    }

  });
  //returns object that is under mouse
  return returnValue;
}

//
/*function unSelectAll() {
  settings.shapes.forEach(function(obj){
    //obj.selected = false;
  });
}*/

//changes coordinates of shape that is sent by reference
function moveObject(currShape,x,y) {
  //console.log("moving in objects");
  var currWidth = currShape.endX - currShape.x;
  var currHeight = currShape.endY - currShape.y;
  currShape.x = x;
  currShape.y = y;
  currShape.endX = currWidth + x;
  currShape.endY = currHeight + y;
}
