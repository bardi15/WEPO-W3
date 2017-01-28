var settings = {
  canvasObj: document.getElementById("drawboard"),
  nextObject: "Rectangle",
  nextColor: "black",
  //stores reference to shape that is being used
  currentShape: undefined,
  //text stored in textbox on website
  currentText: "",
  //list of all shapes to draw on screen
  shapes: [],
  //list of shapes that have been undoed, to be able to redo them
  redoShapes: [],
  //applied with mousedown
  isDrawing: false,
  //if object has been clicked on, it becomes selected
  selected: false,
  //if object is being moved
  movingObject: false,
  //fontSize: 10,
  //lineWidth: 1
  size: 5,
  saved: []
};
