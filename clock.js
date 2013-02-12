function Clock(options) {
  if (typeof options === "undefined") {
    options = {}
  }

  if (typeof options.x === 'undefined') options.x = 0;
  if (typeof options.y === 'undefined') options.y = 0;
  if (typeof options.outlineWidth === 'undefined') options.outlineWidth = 12;
  if (typeof options.tickWidth === 'undefined') options.tickWidth = 8;

  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");

  var self = this;

  var module = {
    draw: function() {
      canvas.width = canvas.width;
      self.ctx.save();
      self.ctx.translate(self.options.x, self.options.y);

      drawOutline();
      drawTicks();
      drawHands();
      self.ctx.restore();
    }
  };

  function drawOutline() {
    self.ctx.beginPath();
    self.ctx.lineWidth = self.options.outlineWidth;
    self.ctx.arc(0, 0, 280, 0, Math.PI * 2, true);
    self.ctx.stroke();
  }

  function drawTicks() {
    self.ctx.lineWidth = self.options.tickWidth;

    for (var i = 0; i < 60; i++) {
      self.ctx.rotate(6 * Math.PI / 180);
      self.ctx.lineCap = "round";
      self.ctx.lineWidth = 2;
      self.ctx.beginPath();
      self.ctx.moveTo(0, 240);
      self.ctx.lineTo(0, 250);
      self.ctx.stroke();
    }

    for (var i = 0; i < 12; i++) {
      self.ctx.rotate(30 * Math.PI / 180);
      self.ctx.beginPath();
      self.ctx.lineWidth = 8;
      self.ctx.lineCap = "round";
      self.ctx.moveTo(0, 200);
      self.ctx.lineTo(0, 250);
      self.ctx.stroke();
    }
  }

  function drawHands() {
    var now = new Date();
    self.ctx.strokeStyle = "#f00";
    self.ctx.fillStyle = "#f00";

    drawMinuteHand(now);
    drawHourHand(now);
    drawSecondHand(now);

    self.ctx.beginPath();
    self.ctx.arc(0, 0, 12, 0, Math.PI * 2, true);
    self.ctx.fill();

  }

  function drawHourHand(time) {
    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.rotate(30 * Math.PI / 180 * (time.getHours() + time.getMinutes() / 60));

    self.ctx.beginPath();
    self.ctx.strokeStyle = "#f00";
    self.ctx.lineWidth = 6;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, 175);
    self.ctx.stroke();

    self.ctx.beginPath();
    self.ctx.strokeStyle = "#fff";
    self.ctx.lineWidth = 2;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, 175);
    self.ctx.stroke();

    self.ctx.restore();
  }

  function drawMinuteHand(time) {
    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.rotate(6 * Math.PI / 180 * (time.getMinutes() + time.getSeconds() / 60));
    self.ctx.beginPath();
    self.ctx.lineWidth = 6;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, 230);
    self.ctx.stroke();
    self.ctx.restore();
  }

  function drawSecondHand(time) {
    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.strokeStyle = "#000";
    self.ctx.rotate(6 * Math.PI / 180 * (time.getSeconds() + time.getMilliseconds() / 1000));
    self.ctx.beginPath();
    self.ctx.lineWidth = 2;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, 250);
    self.ctx.stroke();
    self.ctx.restore();
  }

  return module;
}

window.onload = function() {
  var canvas = document.getElementById("canvas");

  var clock = new Clock({
    canvas: canvas,
    x: canvas.width / 2,
    y: canvas.height / 2
  });

  clock.draw();
  setInterval(clock.draw, 33);
};
