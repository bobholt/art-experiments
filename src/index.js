function describePointsOnCircle(options) {
  var points = [];
  var numberOfPoints = options.numberOfPoints || 72;
  var startAngle = options.startAngle || 0;
  var center = options.center || {
    x: 0,
    y: 0
  };
  var radius = options.radius || 0;
  var angleBetween = (2 * Math.PI) / numberOfPoints;

  var i = 0;

  while (i < numberOfPoints) {
    var angle = angleBetween * i + startAngle;
    var x = Math.cos(angle) * radius + center.x;
    var y = Math.sin(angle) * radius + center.y;

    points.push({
      x: x,
      y: y,
    });

    i++;
  }

  return points;
}

function drawParabolicEnvelope(options) {
  var context = options.context;
  var skip = options.skip || 1;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  skip = (skip + 1) % numberOfPoints;

  for (var j = 0; j < numberOfPoints; j++) {
    from = points[j];
    to = points[(j + skip) % numberOfPoints];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}

function drawCardioidEnvelope(options) {
  var context = options.context;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;
  var connectTo;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  for (var j = 0; j < numberOfPoints; j++) {
    connectTo = (j * 2) % numberOfPoints;
    from = points[j];
    to = points[connectTo];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}


function drawNephroidEnvelope(options) {
  var context = options.context;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;
  var connectTo;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  for (var j = 0; j < numberOfPoints; j++) {
    connectTo = (j * 3) % numberOfPoints;
    from = points[j];
    to = points[connectTo];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}

function drawFour(options) {
  var context = options.context;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;
  var connectTo;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  for (var j = 0; j < numberOfPoints; j++) {
    connectTo = (j * j) % numberOfPoints;
    from = points[j];
    to = points[connectTo];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}

function drawFive(options) {
  var context = options.context;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;
  var connectTo;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  for (var j = 0; j < numberOfPoints; j++) {
    connectTo = (j * j * j) % numberOfPoints;
    from = points[j];
    to = points[connectTo];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}

function drawSix(options) {
  var context = options.context;
  var points = options.points || [];
  var numberOfPoints = points.length;

  var from;
  var to;
  var connectTo;

  context.fillStyle('white');
  context.fillRect(0, 0, context.width, context.height);

  for (var j = 0; j < numberOfPoints; j++) {
    connectTo = (j * j * j * j) % numberOfPoints;
    from = points[j];
    to = points[connectTo];
    context
      .beginPath()
      .moveTo(from.x, from.y)
      .lineTo(to.x, to.y)
      .closePath()
      .stroke();
  }
}

(function() {
  'use strict';

  var one = window.one = new Cee('one');
  var heightWidth = Math.min(one.width, one.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 36,
    radius: radius,
  });

  drawParabolicEnvelope({
    context: one,
    skip: 24,
    points: points,
  });
}());

(function() {
  'use strict';

  var two = window.two = new Cee('two');
  var heightWidth = Math.min(two.width, two.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 72,
    radius: radius,
    startAngle: 3 * Math.PI / 2,
  });

  drawCardioidEnvelope({
    context: two,
    points: points,
  });
}());

(function() {
  'use strict';

  var three = window.three = new Cee('three');
  var heightWidth = Math.min(three.width, three.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 108,
    radius: radius,
  });

  drawNephroidEnvelope({
    context: three,
    points: points,
  });
}());

(function() {
  'use strict';

  var four = window.four = new Cee('four');
  var heightWidth = Math.min(four.width, four.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 90,
    radius: radius,
  });

  drawFour({
    context: four,
    points: points,
  });
}());

(function() {
  'use strict';

  var five = window.five = new Cee('five');
  var heightWidth = Math.min(five.width, five.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 180,
    radius: radius,
  });

  drawFive({
    context: five,
    points: points,
  });
}());

(function() {
  'use strict';

  var six = window.six = new Cee('six');
  var heightWidth = Math.min(six.width, six.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;

  var points = describePointsOnCircle({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: 14,
    radius: radius,
  });

  drawSix({
    context: six,
    points: points,
  });
}());
