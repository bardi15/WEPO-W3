
class Shape {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius
    this.color=color;
  }
  draw() {
  //  var c = document.getElementById("canvas");
  //  var ctx = c.getContext("2d");
  //  ctx.fillStyle="#FF0000";
  //  ctx.fillRect(_x,_y,150,100);
  }
}

class Rectangle extends Shape {
  draw()
  {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.fillStyle="#FF0000";
      ctx.fillRect(this.x,this.y,150,100);
  }
}
