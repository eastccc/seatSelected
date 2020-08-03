import * as spritejs from 'spritejs';
import Hammer from 'hammerjs'
import seatData from './data.json';
import { install } from 'next-draggable'
install(spritejs)
import SeatNode from './nodeElement'
// import gesture from './gesture/gesture.js'

export default function init(){
  const {Scene, Group, Path} = spritejs;
  let maxX = Math.max(...seatData.map(ele=>ele.x))
  let maxY = Math.max(...seatData.map(ele=>ele.y))
  const debug = document.querySelector('#debug')


  //layer宽高 计算最大宽高 + 单个宽高 + 间距
  let width = maxX + 40 + 60
  let height = maxY + 40 + 40
  
  // let width = document.body.clientWidth
  // let height = 440

  //计算：
  //初始化最小缩放宽高 初始化scale为缩放最小值  放大后正常最大宽高为 width   height
  
  // const Gesture = gesture(spritejs).Gesture  
  const container = document.querySelector('#stage');
  
  const scene = new Scene({container, width: width, height: height, mode: 'stickyWidth',});
  const layer = scene.layer();
  
  // let minScale = Math.min(container.offsetWidth/width, container.offsetHeight/height)
  layer.attr({
    width : width,
    height : height
  })
  seatData.forEach(ele=>{
    let seatgroup = new SeatNode(ele).init();
    layer.append(seatgroup);
  })

  let targetW = container.offsetWidth
  let targetH = container.offsetHeight
  let ratew = 1, rateh = 1
  if(targetW < width){
    ratew = targetW / width
  }
  if(targetH < height){
    rateh = targetH / height
  }
  // let minScale = Math.min(ratew, rateh)
  // console.log(ratew, rateh, minScale)
  layer.attr('transformOrigin', [width/2, height/2])
  // layer.attr('translate', [ -width ,0])
  // layer.attr('scale', minScale)
  // layer.attr({
  //   transformOrigin : [width/2,height/2],
  //   translate : [ -width/2 + targetW/2 , -height/2 + targetH/2],
  //   scale : minScale
  // })




  function createSnapshot(){
    const canvas = scene.snapshot({offscreen: true});
    const snapshot = new Image();
    snapshot.style.width = '100%'
    snapshot.src = canvas.toDataURL();
    const domsnap = document.querySelector('#snapshot')
    domsnap.innerHTML = ''
    domsnap.appendChild(snapshot);
  }








  createSnapshot()

  //事件处理
  //添加事件
  var mc = new Hammer.Manager(container);
  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));  
  mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('pan'));

  let startX = 0, startY = 0, oldX = 0, oldY = 0, oldScale = 1, endScale = 1

  

  
  mc.on("hammer.input", function(e) {
    startX = e.deltaX
    startY = e.deltaY
    
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
 });
 mc.on("panstart", function(e){
  oldX = layer.attr('translate')[0]
  oldY = layer.attr('translate')[1]
  debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
});
  mc.on("panmove", function(e){
    // console.log(startX, startX + e.deltaX + oldX, startY + e.deltaY + oldY, 'move')
    layer.attr('translate', [startX + e.deltaX + oldX, startY + e.deltaY + oldY])
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
  });
  mc.on("panend", function(e){
    // console.log(startX + e.deltaX, startY + e.deltaY, 'end')
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
  });

  mc.on("pinchstart", function(e){
    // oldScale = e.scale
    debug.innerText = 'pinchstart' + JSON.stringify(e)
  });

  mc.on('pinchin', function(e) {
    
    if(oldScale*e.scale > 1){
      console.log(oldScale*e.scale, 'pinchin')
      layer.attr('translate', [startX + e.deltaX + oldX, startY + e.deltaY + oldY])
      layer.attr('scale', [oldScale*e.scale, oldScale*e.scale])
      endScale = oldScale*e.scale
      console.log(startX + e.deltaX, startY + e.deltaY)
      debug.innerText = JSON.stringify(layer)
    }
  });
  mc.on('pinchout', function(e) {
    if(e.scale > oldScale){
      console.log(e.scale, 'pinchout')
      layer.attr('translate', [startX + e.deltaX + oldX, startY + e.deltaY + oldY])
      layer.attr('scale', [e.scale, e.scale])
      endScale = e.scale
      console.log(startX + e.deltaX, startY + e.deltaY)
      debug.innerText = JSON.stringify(layer)
    }
  });
  mc.on("pinchend", function(e){
    // console.log(e.scale)
    oldScale = endScale
    console.log(endScale, 'endScale')
  });
  
}
