function Clock(options) {
  var defaultOptions = {
    x: 0,
    y: 0,
    size: 280,
    tickWidth: 8
  }

  if (typeof options === "undefined") {
    options = {}
  }

  for (key in options) {
    defaultOptions[key] = options[key];
  }

  options = defaultOptions;

  this.options = options;
  this.ctx = this.options.ctx;

  var self = this;

  var module = {
    draw: function() {
      self.ctx.save();
      self.ctx.translate(self.options.x, self.options.y);

      drawOutline();
      drawTicks();
      drawHands();
      self.ctx.restore();
    },

    setSize: function(size) {
      self.options.size = size;
      return this;
    },

    size: function(size) {
      return self.options.size;
    }
  };

  function drawOutline() {
    var outlineWidth = self.options.size * 0.04;

    self.ctx.beginPath();
    self.ctx.lineWidth = outlineWidth;
    self.ctx.arc(0, 0, self.options.size, 0, Math.PI * 2, true);
    self.ctx.stroke();
  }

  function drawTicks() {
    self.ctx.lineWidth = self.options.tickWidth;

    var bigTickWidth = self.options.size * 0.03;
    var smallTickWidth = self.options.size * 0.01;

    var smallTickSize = self.options.size * 0.04;
    var smallTickStart = self.options.size * 0.9;
    var smallTickStop = smallTickStart - smallTickSize;

    for (var i = 0; i < 60; i++) {
      self.ctx.rotate(6 * Math.PI / 180);
      self.ctx.lineCap = "round";
      self.ctx.lineWidth = smallTickWidth;
      self.ctx.beginPath();
      self.ctx.moveTo(0, smallTickStart);
      self.ctx.lineTo(0, smallTickStop);
      self.ctx.stroke();
    }

    var bigTickSize = self.options.size * 0.16;
    var bigTickStart = self.options.size * 0.9;
    var bigTickStop = bigTickStart - bigTickSize;

    for (var i = 0; i < 12; i++) {
      self.ctx.rotate(30 * Math.PI / 180);
      self.ctx.beginPath();
      self.ctx.lineWidth = bigTickWidth;
      self.ctx.lineCap = "round";
      self.ctx.moveTo(0, bigTickStart);
      self.ctx.lineTo(0, bigTickStop);
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

    var handDotSize = self.options.size * 0.04;
    self.ctx.beginPath();
    self.ctx.arc(0, 0, handDotSize, 0, Math.PI * 2, true);
    self.ctx.fill();
  }

  function drawHourHand(time) {
    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.rotate(30 * Math.PI / 180 * (time.getHours() + time.getMinutes() / 60));

    var hourHandWidth = self.options.size * 0.03;
    var hourHandLength = self.options.size * 0.6;
    var hourHandFillWidth = hourHandWidth * 0.25;

    self.ctx.beginPath();
    self.ctx.strokeStyle = "#f00";
    self.ctx.lineWidth = hourHandWidth;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, hourHandLength);
    self.ctx.stroke();

    self.ctx.beginPath();
    self.ctx.strokeStyle = "#fff";
    self.ctx.lineWidth = hourHandFillWidth;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, hourHandLength);
    self.ctx.stroke();

    self.ctx.restore();
  }

  function drawMinuteHand(time) {
    var minuteHandWidth = self.options.size * 0.02;
    var minuteHandLength = self.options.size * 0.8;

    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.rotate(6 * Math.PI / 180 * (time.getMinutes() + time.getSeconds() / 60));
    self.ctx.beginPath();
    self.ctx.lineWidth = minuteHandWidth;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, minuteHandLength);
    self.ctx.stroke();
    self.ctx.restore();
  }

  function drawSecondHand(time) {
    var secondHandWidth = self.options.size * 0.01;
    var secondHandLength = self.options.size * 0.8;

    self.ctx.save();
    self.ctx.rotate(Math.PI);
    self.ctx.strokeStyle = "#000";
    self.ctx.rotate(6 * Math.PI / 180 * (time.getSeconds() + time.getMilliseconds() / 1000));
    self.ctx.beginPath();
    self.ctx.lineWidth = secondHandWidth;
    self.ctx.moveTo(0, 0);
    self.ctx.lineTo(0, secondHandLength);
    self.ctx.stroke();
    self.ctx.restore();
  }

  return module;
}
