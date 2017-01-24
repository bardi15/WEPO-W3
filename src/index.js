$( document ).ready(function() {
  var down = false;
  var mouse = new Mouse();
    console.log( "ready!" );
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

        console.log(x, y);
        //console.log("should draw...");
        var square = new Shape(10,10,0,0)
        square.draw(x,y);
        console.log(mouse.xpos());


      }});
});
