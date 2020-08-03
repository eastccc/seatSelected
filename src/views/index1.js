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
  
  const scene = new Scene({container, width: container.offsetWidth, height: 440, mode: 'stickyWidth',});
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
  let minScale = Math.min(ratew, rateh)
  console.log(ratew, rateh, minScale)
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

  mc.on('pinch', function(e) {
    console.log(scene, 'scene')
  console.log(layer.attr('transformOrigin'), 'layer')
    layer.attr('translate', [-width + startX + e.deltaX, -height/2  + startY + e.deltaY])
    layer.attr('scale', e.scale)
    console.log(layer.attr('transformOrigin'), 'layer')
    debug.innerText = JSON.stringify(layer)
  });

  let startX = 0, startY = 0;
  mc.on("hammer.input", function(e) {
    startX = e.deltaX;
    startY = e.deltaY;
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
 });
  mc.on("panstart panmove", function(e){
    layer.attr('translate', [-width + startX + e.deltaX, -height/2  + startY + e.deltaY])
    debug.innerText = 'panmove' + JSON.stringify(e.deltaX)
  });
  mc.on("pinchstart pinchmove", function(e){
    debug.innerText = 'pinchstart' + JSON.stringify(e)
  });
  
}
