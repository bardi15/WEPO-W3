$( document ).ready(function() {
  var down = false;
  var listOfObjects = [];
    console.log( "ready!" );



    $( "#canvas" ).click(function() {
      listOfObjects.forEach(function(word){
        word.draw();
        console.log(listOfObjects.length );
      })
    });
    $( "#canvas" ).mousedown(function() {
      down = true;
    });
    $( "#canvas" ).mouseup(function() {

      down = false;
    });
    $( "#canvas" ).mousemove(function(event) {
      if (down){
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        //console.log("should draw...");
        var rect = new Rectangle(x,y,0,0)
        listOfObjects.push(rect);
        //square.draw(x,y);
        console.log(x, y);


    }});
    $( "#undo" ).click(function() {
      listOfObjects.pop();
    });
});
