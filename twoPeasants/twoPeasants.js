
/**
* Function that creates a 'random' simple polygon using the 
* two peasants function described here:
* http://web.informatik.uni-bonn.de/I/GeomLab/RandomPolygon/index.html.en
* 
* The algorithm runs in O(n log n) time.  
*/
function twoPeasants(nrOfPoints, maxX, maxY) {
  
  // Create the polygon points and determine leftmost/rigthmost point
  points = [], leftmost  = 0, rightmost = 0;   

  for(i = 0; i <= nrOfPoints; i++) {
    // Generate a random point
    x = Math.round(Math.random() * maxX);
    y = Math.round(Math.random() * maxY);
    points.push([x, y]);

    // Determine if point is left/rightmost
    leftmostX   = points[leftmost][0];
    rightmostX  = points[rightmost][0];
    leftmost    = x < leftmostX ? i : leftmost;
    rightmost   = x > rightmostX ? i : rightmost;
  }


  // Split points in two sets, left and right of line [leftmost, rightmost]
  pointsLeft = [], pointsRight = [];
  $.each(points, function() {
    if (isLeft(points[leftmost], points[rightmost], this)) {
      pointsLeft.push(this);
    } 
    else {
      pointsRight.push(this);
    }
  })
  
  // Sort left points by x-coord from left to right, and right points vice versa
  pointsLeft.sort(function(point1, point2) {return point1[0]-point2[0]});
  pointsRight.sort(function(point1, point2) {return point2[0]-point1[0]});

  // Create resulting polygon point list by joining pointsLeft with pointsRight
  polygon = pointsLeft.concat(pointsRight);

  return polygon;
}


/**
* Function that determines whether a point is left of a line
*/
function isLeft(p1, p2, p3){

  return ((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0])) > 0;
}