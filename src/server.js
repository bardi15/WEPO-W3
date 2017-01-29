function save(shapes) {
  var url = "http://localhost:3000/api/drawings";
  var save = {
      title: " ",
      content: shapes
  };
  $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: url,
      data: JSON.stringify(save),
      success: function (data) {
        console.log("IMAGE SAVED");
      },
      error: function (xhr, err) {
        console.log("UNABLE TO SAVE");
      }
  });
}

function loadSaved () {
  var uGet = "http://localhost:3000/api/drawings/";
  $.getJSON(uGet, function (data) {
    var newest = data.length - 1;
    if (newest >= 0) {
      $.getJSON(uGet + newest, function (data) {
        createObj(data);
      });
    }
  });
}

function createObj(jsonData) {
  var content = jsonData["content"];
  if (content.length > 0) {
    clearDrawArrays();
    content.forEach(function(element) {
      if (element.name === "Rectangle") {
        var m = new Rectangle(element.x, element.y, element.color);
        m.endX = element.endX;
        m.endY = element.endY;
        settings.shapes.push(m);
      }
      else if (element.name === "Line") {
        var m = new Line(element.x, element.y, element.color);
        m.endX = element.endX;
        m.endY = element.endY;
        m.thickness = element.thickness;
        settings.shapes.push(m);
      }
      else if (element.name === "Text") {
        var m = new Text(element.x, element.y, element.color);
        m.endX = element.endX;
        m.endY = element.endY;
        m.font = element.font;
        m.currentText = element.currentText;
        m.fontSize = element.fontSize;
        settings.shapes.push(m);
      }
      else if (element.name === "Circle") {
        var m = new Circle(element.x, element.y, element.color);
        m.endX = element.endX;
        m.endY = element.endY;
        settings.shapes.push(m);
      }
      else if (element.name === "Pen") {
        var m = new Pen(element.x, element.y, element.color);
        m.moveL = element.moveL;
        m.thickness = element.thickness;
        m.endX = element.endX;
        m.endY = element.endY;
        settings.shapes.push(m);
      }
      drawAll();
    });
  }
}
