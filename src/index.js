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
  var points = describePointsOnCircle({
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
    id: 'one',
    numberOfPoints: 36,
  });

  drawEnvelope({
    calc: cardioid,
    id: 'two',
    numberOfPoints: 72,
  });

  drawEnvelope({
    calc: nephroid,
    id: 'three',
    numberOfPoints: 108,
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 2); },
    id: 'four',
    numberOfPoints: 90,
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 3); },
    id: 'five',
    numberOfPoints: 180,
  });

  drawEnvelope({
    calc: function(i) { return Math.pow(i, 4); },
    id: 'six',
    numberOfPoints: 14,
  });
}());
