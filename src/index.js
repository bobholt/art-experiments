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

function describePointsOnSquare(options) {
  var points = [];
  var numberOfPoints = options.numberOfPoints || 72;
  var center = options.center || {
    x: 0,
    y: 0
  };
  var radius = options.radius || 0;
  var perimeter = radius * 8;
  var distanceBetween = perimeter / numberOfPoints;
  var counterX = radius;
  var counterY = -radius;

  var i = 0;

  while (i < numberOfPoints) {
    var x, y;

    x = counterX;
    y = counterY;

    if (i < numberOfPoints / 4) {
      counterY += distanceBetween;
    } else if (i < numberOfPoints / 2) {
      counterX -= distanceBetween;
    } else if (i < 3 * numberOfPoints / 4) {
      counterY -= distanceBetween;
    } else {
      counterX += distanceBetween;
    }

    points.push({
      x: x + center.x,
      y: y + center.y,
    });

    i++;
  }
  return points;
}

function describePointsOnTriangle(options) {
  var points = [];
  var numberOfPoints = options.numberOfPoints || 72;
  var center = options.center || {
    x: 0,
    y: 0
  };
  var radius = options.radius || 0;
  var perimeter = (radius * 2) + radius * 2 / Math.cos(Math.PI / 3);
  var distanceBetween = perimeter / numberOfPoints;
  var counterX = 0;
  var counterY = -radius;

  var i = 0;

  while (i < numberOfPoints) {
    var x, y;

    x = counterX;
    y = counterY;

    if (i < numberOfPoints / 3) {
      counterX += Math.sin(Math.PI / 6) * distanceBetween;
      counterY += Math.cos(Math.PI / 6) * distanceBetween;
    } else if (i < 2 * numberOfPoints / 3) {
      counterX -= distanceBetween;
    } else {
      counterX += Math.cos(Math.PI / 3) * distanceBetween;
      counterY -= Math.sin(Math.PI / 3) * distanceBetween;
    }

    points.push({
      x: x + center.x,
      y: y + center.y,
    });

    i++;
  }
  return points;
}

function cardioid(i) {
  return i * 2;
}

function nephroid(i) {
  return i * 3;
}

function drawEnvelope(options) {
  var context = document.getElementById(options.id).getContext('2d');
  var heightWidth = Math.min(context.canvas.width, context.canvas.height);
  var margin = 50;
  var radius = heightWidth / 2 - margin;
  var numberOfPoints = options.numberOfPoints;
  var shapeFunction;

  switch (options.shape) {
    case 'circle':
      shapeFunction = describePointsOnCircle;
      break;
    case 'square':
      shapeFunction = describePointsOnSquare;
      break;
    case 'triangle':
      shapeFunction = describePointsOnTriangle;
      break;
    default:
      shapeFunction = describePointsOnCircle;
  }

  var points = shapeFunction({
    center: {
      x: margin + radius,
      y: margin + radius,
    },
    numberOfPoints: numberOfPoints,
    radius: radius,
  });

  var from;
  var to;

  context.fillStyle = 'white';
  context.fillRect(0, 0, context.width, context.height);

  for (var i = 0; i < numberOfPoints; i++) {
    from = points[i];
    to = points[options.calc(i) % numberOfPoints];
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.closePath();
    context.stroke();
  }
}

(function() {
  'use strict';

  drawEnvelope({
    calc: function(i) { return i + 12; },
    id: 'circle-one',
    numberOfPoints: 36,
    shape: 'circle',
  });

  drawEnvelope({
    calc: cardioid,
    id: 'circle-two',
    numberOfPoints: 72,
    shape: 'circle',
  });

  drawEnvelope({
    calc: nephroid,
    id: 'circle-three',
    numberOfPoints: 108,
    shape: 'circle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 2); },
    id: 'circle-four',
    numberOfPoints: 90,
    shape: 'circle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 3); },
    id: 'circle-five',
    numberOfPoints: 180,
    shape: 'circle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 4); },
    id: 'circle-six',
    numberOfPoints: 18,
    shape: 'circle',
  });

  drawEnvelope({
    calc: function(i) { return i + 12; },
    id: 'square-one',
    numberOfPoints: 36,
    shape: 'square',
  });

  drawEnvelope({
    calc: cardioid,
    id: 'square-two',
    numberOfPoints: 72,
    shape: 'square',
  });

  drawEnvelope({
    calc: nephroid,
    id: 'square-three',
    numberOfPoints: 108,
    shape: 'square',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 2); },
    id: 'square-four',
    numberOfPoints: 90,
    shape: 'square',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 3); },
    id: 'square-five',
    numberOfPoints: 180,
    shape: 'square',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 4); },
    id: 'square-six',
    numberOfPoints: 18,
    shape: 'square',
  });

  drawEnvelope({
    calc: function(i) { return i + 12; },
    id: 'triangle-one',
    numberOfPoints: 36,
    shape: 'triangle',
  });

  drawEnvelope({
    calc: cardioid,
    id: 'triangle-two',
    numberOfPoints: 72,
    shape: 'triangle',
  });

  drawEnvelope({
    calc: nephroid,
    id: 'triangle-three',
    numberOfPoints: 108,
    shape: 'triangle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 2); },
    id: 'triangle-four',
    numberOfPoints: 90,
    shape: 'triangle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 3); },
    id: 'triangle-five',
    numberOfPoints: 180,
    shape: 'triangle',
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 4); },
    id: 'triangle-six',
    numberOfPoints: 18,
    shape: 'triangle',
  });
}());
