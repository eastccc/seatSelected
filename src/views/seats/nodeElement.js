import * as spritejs from 'spritejs';
const {Group, Path} = spritejs;

const seatPath1 = "M11,1.5 C6.85786438,1.5 3.5,4.85786438 3.5,9 L3.5,28 C3.5,29.9329966 5.06700338,31.5 7,31.5 L25,31.5 C26.9329966,31.5 28.5,29.9329966 28.5,28 L28.5,9 C28.5,4.85786438 25.1421356,1.5 21,1.5 L11,1.5 Z";
const seatPath2 = "M31.5,15 C31.5,13.3431458 30.1568542,12 28.5,12 C26.8431458,12 25.5,13.3431458 25.5,15 L25.5,23 C25.5,24.3807119 24.3807119,25.5 23,25.5 L9,25.5 C7.61928813,25.5 6.5,24.3807119 6.5,23 L6.5,15 C6.5,13.3431458 5.15685425,12 3.5,12 C1.84314575,12 0.5,13.3431458 0.5,15 L0.5,26 C0.5,29.0375661 2.96243388,31.5 6,31.5 L26,31.5 C29.0375661,31.5 31.5,29.0375661 31.5,26 L31.5,15 Z";
const seatPath3 = "M28.9292012,12.0304066 L28.5,11.9690142 L28.5,9 C28.5,4.85786438 25.1421356,1.5 21,1.5 L11,1.5 C6.85786438,1.5 3.5,4.85786438 3.5,9 L3.5,11.9690142 L3.07079879,12.0304066 C1.60371045,12.2402571 0.5,13.5028128 0.5,15 L0.5,26 C0.5,29.0375661 2.96243388,31.5 6,31.5 L26,31.5 C29.0375661,31.5 31.5,29.0375661 31.5,26 L31.5,15 C31.5,13.5028128 30.3962896,12.2402571 28.9292012,12.0304066 Z"
const seatPath4 = "M22.5688538,12.889892 L14.4449928,20.8889925 C14.2487772,21.0795102 13.9322232,21.0795102 13.7386256,20.8889925 L12.6716388,19.8387476 L9.14732667,16.3660028 C8.95089111,16.1752211 8.95089111,15.863551 9.14732667,15.6694254 L10.2114974,14.6214905 C10.408219,14.4283989 10.7216711,14.4283989 10.9181066,14.6214905 L14.0905552,17.7451876 L20.7952578,11.1430697 C20.9917154,10.9523101 21.3082474,10.9523101 21.504705,11.1430697 L22.5688758,12.1930727 C22.7627594,12.3838543 22.7627594,12.6955244 22.5688538,12.889892 Z"

const colorMap = {
  disabled : {
    strokeColor : '#D3D3D3',
    fillColor : '#DDE0E5'
  },
  color : {
    green : '#48C38E',
    yellow : '#FFD73D',
    blue : '#80A1F1',
    orange : '#FD9812',
    purple : '#743E9A',
    // red : '#ff0000'
    red : '#dedede'
  }
}
class SeatNode {
  constructor(ele) {
    this.data = ele
    this.group = new Group();
    this.group.attr({
      transformOrigin : [0, 0],
      translate : [ele.x, ele.y],
      rotate : ele.rotate
    })
    //配置path
    this.path1 = new Path();
    this.path2 = new Path();
    this.path3 = new Path();
    this.path4 = new Path(); 
    let strokeColor = ele.status == 'disabled' ?  colorMap.disabled.strokeColor : "rgba(0,0,0,0.45)";
    let fillColor = ele.status == 'disabled' ?  colorMap.disabled.fillColor : colorMap.color[ele.color];
    this.path1.attr({
      d: seatPath1,
      strokeColor : strokeColor,
      fillColor : fillColor
    });
    this.path2.attr({
      d: seatPath2,
      strokeColor : strokeColor,
      fillColor : fillColor
    });
    this.path3.attr({
      d: seatPath3,
      strokeColor : "#000000",
      fillColor : '#000000',
      opacity : .6
    });
    this.path4.attr({
      d: seatPath4,
      transformOrigin : ['50%', '50%'],
      fillColor : '#FFFFFF',
      rotate : 0
    });

    this.group.append(this.path1);
    this.group.append(this.path2);
    if(ele.status == 'selectd'){
      this.group.append(this.path3);
      this.group.append(this.path4);
    }
    
    this.bindEvent();
  }
  init(){
    return this.group
  }
  bindEvent(){
    this.group.addEventListener('click', (evt)=>{
      if(this.data.status == 'disabled'){
        return false
      }

      if(this.data.status == 'selectd'){
        this.path3.remove();
        this.path4.remove();
        this.data.status = 'onSale'
        return false
      }

      if(this.data.status == 'onSale'){
        this.group.append(this.path3);
        this.group.append(this.path4);
        this.data.status = 'selectd'
        return false
      }
      
    })
    
  }
}


export default SeatNode;