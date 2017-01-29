var drawing = {
    title: "Nú er gaman",
    content: "the contents of the shapes array"
};




function save(shapes) {
  var url = "http://localhost:3000/api/drawings";
  for (i = 0; i < shapes.length; i++) {
    console.log("i: " , shapes[i]);
  }

  var sm = JSON.stringify(shapes);

  var dm = {
      title: " ",
      content: shapes
  };

 //console.log("dm:" + JSON.stringify(dm));

  $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: url,
      data: JSON.stringify(dm),
      success: function (data) {
        console.log("success");
          // The drawing was successfully saved
      },
      error: function (xhr, err) {
        console.log("error");

          // The drawing could NOT be saved
      }
  });

}

function loadSaved () {
  var latest = 0;
  var uGet = "http://localhost:3000/api/drawings/";

  $.getJSON(uGet, function (data) {
    var newest = data.length - 1;
    $.getJSON(uGet + newest, function (data) {
      createObj(data);

    });
  });
}

function createObj(jsonData) {
  clearDrawArrays();
  var content = jsonData["content"];
  console.log(content);
  content.forEach(function(element) {
    console.log("crobj:" , element);
    if (element.name === "Rectangle") {
      var m = new Rectangle(element.x, element.y, element.color);
      m.endX = element.endX;
      m.endY = element.endY;
      console.log(m);
      settings.shapes.push(m);
    }
    else if (element.name === "Line") {
      var m = new Line(element.x, element.y, element.color);
      m.endX = element.endX;
      m.endY = element.endY;
      m.thickness = element.thickness;

      console.log(m);
      settings.shapes.push(m);
    }
    else if (element.name === "Text") {
      var m = new Text(element.x, element.y, element.color);
      m.endX = element.endX;
      m.endY = element.endY;
      m.font = element.font;
      m.currentText = element.currentText;
      m.fontSize = element.fontSize;

      console.log(m);
      settings.shapes.push(m);
    }
    else if (element.name === "Circle") {
      var m = new Circle(element.x, element.y, element.color);
      m.endX = element.endX;
      m.endY = element.endY;

      console.log(m);
      settings.shapes.push(m);
    }
    else if (element.name === "Pen") {
      var m = new Pen(element.x, element.y, element.color);
      m.moveL = element.moveL;
      m.thickness = element.thickness;
      m.endX = element.endX;
      m.endY = element.endY;
      console.log(m);
      settings.shapes.push(m);
    }
    drawAll();
  });
  //console.log(jsonData["content"]);

}
