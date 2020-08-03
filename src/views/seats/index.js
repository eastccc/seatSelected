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


  //layer宽高
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
  console.log(layer.attr('scale'), 'scale')
  // let minScale = Math.min(ratew, rateh)
  // console.log(ratew, rateh, minScale)
  // layer.attr('transformOrigin', [targetW/2, targetH/2])
  // layer.attr('translate', [ -width ,0])
  // layer.attr('scale', minScale)
  // layer.attr({
  //   transformOrigin : [width/2,height/2],
  //   translate : [ -width/2 + targetW/2 , -height/2 + targetH/2],
  //   scale : minScale
  // })

  //添加事件
  var mc = new Hammer.Manager(container);
  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));  
  mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('pan'));

  let startX = 0, startY = 0

  mc.on('pinch', function(e) {
    if(e.scale > 1){
      
      layer.attr('scale', [e.scale, e.scale])
      layer.attr('translate', [startX + e.deltaX, startY + e.deltaY])
      console.log(startX + e.deltaX, startY + e.deltaY)
      debug.innerText = JSON.stringify(layer)
    }
  });

  
  mc.on("hammer.input", function(e) {
    startX = e.deltaX;
    startY = e.deltaY;
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
 });
 mc.on("panstart", function(e){
  startX += layer.attr('translate')[0];
  startY += layer.attr('translate')[1];
  debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
});
  mc.on("panmove", function(e){
    layer.attr('translate', [startX + e.deltaX, startY + e.deltaY])
    console.log(startX + e.deltaX, startY + e.deltaY, 'move')
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
  });
  mc.on("panend", function(e){
    console.log(startX + e.deltaX, startY + e.deltaY, 'end')

    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
  });
  mc.on("pinchstart pinchmove", function(e){
    debug.innerText = 'pinchstart' + JSON.stringify(e)
  });
  
}
