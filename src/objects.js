
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    //Where mouse ends
    this.endX = x;
    this.endY = y;
    this.color = settings.nextColor;

    //this.selected=false;
    //text for text objects
  //  this.currentText="";
  }
  //sets end coordinates
  setEnd(x,y) {
    this.endX = x;
    this.endY = y;
  }
  draw() {

  }
}

class Rectangle extends Shape {
  constructor(x, y, color) {
    super(x,y,color);
  }

  draw(context) {
    //console.log("rect color: " + this.color);
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
  //  console.log(this);
    if (this.selected) {
    //  console.log("box selected...");
      context.strokeStyle = "grey";
      context.lineWidth   = 5;
      context.setLineDash([10, 15]);
      context.strokeRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
    }
  }
}

class Circle extends Shape {
  constructor(x, y, color) {
    super(x,y,color);

  }

//calculates location for cirlce, needs to be different from other obj
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
    if (this.selected) {
      console.log("circle selected...");

  /*    context.beginPath();
      context.strokeStyle = "grey";
      context.lineWidth   = 5;
      context.setLineDash([10, 15]);
      context.arc(this.x, this.y, xEnd, yEnd, 0, 2* Math.PI);
      context.fill();
      context.stroke();*/
    }
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
    this.fontSize = settings.fontSize;
  }

  draw(context) {
    context.font = this.fontSize + "px Arial";
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
    this.moveL = [];
    this.x1 = Number.MAX_VALUE;
    this.y1 = Number.MAX_VALUE;
    this.x2 = 0;
    this.y2 = 0;
  }

  draw(context) {

    this.moveL.push({x: this.endX, y: this.endY});
    //console.log(this.moveL.length);

    context.beginPath();
    this.moveL.forEach(function(obj){
      //console.log(obj);
      context.lineTo(obj.x, obj.y);
      context.stroke();
      //counter++;
      //console.log("NUMBER: " + counter + "=====");
    });

  /*  for (var i = 0; i < this.moveL.length; i++) {
      if (this.moveL[i].x < this.x1) {
        //console.log("this.moveL.x < this.x1");
        this.x1 = this.moveL[i].x;
      }
      if (this.moveL[i].y < this.y1) {
        //console.log("this.moveL.y < this.y1");
        this.y1 = this.moveL[i].y;
      }
      if (this.moveL[i].x > this.x2) {
        //console.log("this.moveL.x > this.x2");
        this.x2 = this.moveL[i].x;
      }
      if (this.moveL[i].y > this.y2) {
        //console.log("this.moveL.y > this.y2");
        this.y2 = this.moveL[i].y;
      }
    }*/

    //console.log("minmax: " , this.x1, this.y1, this.x2, this.y2);

    context.closePath();
/*    this.x = this.x1;
    this.y = this.y1;
    this.endX = this.x2;
    this.endY = this.x2;*/
  }

}
