const spawn = require('child_process').spawn
const os = require('os')

const temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

function drawCpuUsageFrame(){
  let result1 = []
  result1.push( {"ServiceName":"drawRect","x":0,"y":5,"w":3,"h":3,"color":[102,217,239]})
  result1.push( {"ServiceName":"drawRect","x":4,"y":5,"w":11,"h":3,"color":[102,217,239]})
  result1.push( {"ServiceName":"drawRect","x":16,"y":5,"w":4,"h":3,"color":[139,195,74]})
  result1.push( {"ServiceName":"drawRect","x":21,"y":5,"w":11,"h":3,"color":[102,217,239]})

  // result1.push( {"ServiceName":"drawPixel","x":5,"y":6,"color":[102,217,239]})

  result1.push( {"ServiceName":"drawLine","x0":16,"y0":5,"x1":19,"y1":5,"color":[0,255,0]})
  result1.push( {"ServiceName":"drawLine","x0":17,"y0":6,"x1":18,"y1":6,"color":[0,255,0]})

  result1.push( {"ServiceName":"drawLine","x0":1,"y0":6,"x1":2,"y1":6,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":4,"y0":6,"x1":13,"y1":6,"color":[0,0,0]})

  result1.push( {"ServiceName":"drawLine","x0":17,"y0":7,"x1":18,"y1":7,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":21,"y0":6,"x1":30,"y1":6,"color":[0,0,0]})
  // result1.push( {"ServiceName":"drawLine","x0":3,"y0":5,"x1":3,"y1":7,"color":[0,0,0]})
  // result1.push( {"ServiceName":"drawLine","x0":7,"y0":5,"x1":7,"y1":7,"color":[0,0,0]})
  // result1.push( {"ServiceName":"drawLine","x0":11,"y0":5,"x1":11,"y1":7,"color":[0,0,0]})

  return result1
}

function drawCpuUsage(){
  let result2 = []
  let usedCpu = Math.round(os.loadavg()[0] * 1.25)
  usedCpu = usedCpu <= 0 ? 0 : (usedCpu - 1)
  result2.push( {"ServiceName":"drawLine","x0":4,"y0":6,"x1":13,"y1":6,"color":[0,0,0]})
  if (usedCpu < 5) {
    result2.push( {"ServiceName":"drawLine", "x0":4, "y0":6, "x1":4 + usedCpu, "y1":6, "color":[255,152,0]})
  } else {
    result2.push( {"ServiceName":"drawLine", "x0":4, "y0":6, "x1":4 + usedCpu, "y1":6, "color":[240,61,14]})
  }
  return result2
}

function drawMemoryUsage(){
  let result3 = []
  const realLength = 10
  let usedMem = Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * realLength)
  usedMem = usedMem <= 0 ? 0 : (usedMem - 1)
  result3.push( {"ServiceName":"drawLine","x0":21,"y0":6,"x1":30,"y1":6,"color":[0,0,0]})
  if (usedMem < 5) {
    result3.push( {"ServiceName":"drawLine", "x0":21, "y0":6, "x1":21 + (usedMem), "y1":6, "color":[180,240,240]})
  } else {
    result3.push( {"ServiceName":"drawLine", "x0":21, "y0":6, "x1":21 + (usedMem), "y1":6, "color":[240,61,14]})
  }
  return result3
}

function drawTemperatureIcon(){
  let result3 = []
  result3.push( {"ServiceName":"drawRect","x":19,"y":1,"w":4,"h":3,"color":[166,215,39]})

  result3.push( {"ServiceName":"drawPixel","x":20,"y":2,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":21,"y":2,"color":[180,240,240]})

  result3.push( {"ServiceName":"drawPixel","x":18,"y":1,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":20,"y":0,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":22,"y":0,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":23,"y":1,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":18,"y":3,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":19,"y":4,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":21,"y":4,"color":[180,240,240]})
  result3.push( {"ServiceName":"drawPixel","x":23,"y":3,"color":[180,240,240]})

  return result3
}

module.exports = {
  temperatureMonitor: (callBack) => {
    temp.stdout.on('data', function(data) {
      callBack(data/1000)
    })
  },
  drawTemperatureIcon: drawTemperatureIcon,
  drawCpuUsageFrame: drawCpuUsageFrame,
  drawCpuUsage: drawCpuUsage,
  drawMemoryUsage: drawMemoryUsage
}
