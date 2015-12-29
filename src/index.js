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
  var distanceBetween = radius * 8 / numberOfPoints;
  var counterX = radius;
  var counterY = -radius;

  var i = 0;

  while (i < numberOfPoints) {
    var x, y;

    x = counterX;
    y = counterY;

    if (i < numberOfPoints / 4) {
      Math.min(counterY += distanceBetween, radius);
    } else if (i < numberOfPoints / 2) {
      Math.max(counterX -= distanceBetween, -radius);
    } else if (i < 3 * numberOfPoints / 4) {
      Math.max(counterY -= distanceBetween, -radius);
    } else {
      Math.min(counterX += distanceBetween, radius);
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
}());
