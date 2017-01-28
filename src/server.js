var drawing = {
    title: "Nú er gaman",
    content: "the contents of the shapes array"
};




function save(shapes, name) {
  var url = "http://localhost:3000/api/drawings";
  for (i = 0; i < shapes.length; i++) {
    console.log("i: " + shapes[i]);
  }

  var sm = JSON.stringify(shapes);

  var dm = {
      title: name,
      content: shapes
  };

 console.log("dm:" + JSON.stringify(dm));

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

function getitemCount() {
  var uGet = "http://localhost:3000/api/drawings/";
  var x = $.getJSON(uGet, function (data) {
    console.log("gic: " + data.length);
    return data.length;
  });
  return x;
}

function loadSaved () {
  var latest = 0;
  var uGet = "http://localhost:3000/api/drawings/";
  clearSaves();
  var count = getitemCount();
  $.getJSON(uGet, function (data) {
    for (i = 0; i < data.length; i++) {
      createRectangleObj(data[i]);
      console.log("hi");
      //console.log(JSON.stringify(data[i].title));
      //createRectangleObj(data[i]);
    }
    console.log("ciount: " + count);
  });

  console.log("CCCciount: " + count);
}

function clearSaves() {
  while (settings.saved.length > 0) {
    settings.saved.pop();
  }
}

function createRectangleObj(jsonData) {
  var parsedData = JSON.parse(JSON.stringify(jsonData));
  //console.log("parsedData1" + parsedData.id);
  //console.log("parsedData2" + parsedData.title);
  var main = JSON.parse(JSON.stringify(parsedData.title));
  console.log(jsonData);
  //console.log("parsedData3" + parsedData.content);
  var x = jsonData["title"];
  //console.log("createRectangleObj: "+ JSON.stringify(x));
  //console.log("createRectabj: "+ x.length);

  //var shape = new Rectangle()
}
