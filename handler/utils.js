const spawn = require('child_process').spawn
const os = require('os')

const temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])

function drawCpuUsageFrame(){
  let result1 = []
  result1.push( {"ServiceName":"drawRect","x":0,"y":5,"w":3,"h":3,"color":[102,217,239]})
  result1.push( {"ServiceName":"drawRect","x":4,"y":5,"w":3,"h":3,"color":[102,217,239]})
  result1.push( {"ServiceName":"drawRect","x":8,"y":5,"w":3,"h":3,"color":[102,217,239]})
  result1.push( {"ServiceName":"drawRect","x":12,"y":5,"w":20,"h":3,"color":[102,217,239]})

  result1.push( {"ServiceName":"drawPixel","x":5,"y":6,"color":[102,217,239]})

  result1.push( {"ServiceName":"drawLine","x0":1,"y0":6,"x1":2,"y1":6,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":5,"y0":7,"x1":6,"y1":7,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":9,"y0":5,"x1":9,"y1":6,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":3,"y0":5,"x1":3,"y1":7,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":3,"y0":5,"x1":3,"y1":7,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":7,"y0":5,"x1":7,"y1":7,"color":[0,0,0]})
  result1.push( {"ServiceName":"drawLine","x0":11,"y0":5,"x1":11,"y1":7,"color":[0,0,0]})

  return result1
}

function drawCpuUsage(){
  let result2 = []
  const realLength = 18
  let usedCpu = parseInt(os.loadavg()[0] * realLength)
  result2.push( {"ServiceName":"drawLine","x0":13,"y0":6,"x1":30,"y1":6,"color":[0,0,0]})
  result2.push( {"ServiceName":"drawLine","x0":13,"y0":6,"x1":13 + usedCpu,"y1":6,"color":[230,219,116]})
  return result2
}

function drawTemperatureIcon(){
  let result3 = []
  result3.push( {"ServiceName":"drawRect","x":20,"y":1,"w":3,"h":3,"color":[255,255,255]})

  result3.push( {"ServiceName":"drawPixel","x":21,"y":2,"color":[19,161,14]})

  result3.push( {"ServiceName":"drawPixel","x":19,"y":1,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":20,"y":0,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":22,"y":0,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":23,"y":1,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":19,"y":3,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":20,"y":4,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":22,"y":4,"color":[19,161,14]})
  result3.push( {"ServiceName":"drawPixel","x":23,"y":3,"color":[19,161,14]})

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
  drawCpuUsage: drawCpuUsage
}