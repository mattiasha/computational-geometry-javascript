$(function() {

    // Create SVG drawing
    var draw = SVG('drawing');

    // Run two peasants algorithm
    points = twoPeasants(20, 600, 600);

    // Loop all points and draw simple polygon
    $.each(points, function(i) {
      var x = 0, y = 1;
      next = i != points.length - 1 ? i + 1 : 0;

      draw.line(
        points[i][x],
        points[i][y],
        points[next][x],
        points[next][y])
      .stroke({ width: 1 });

    })
});