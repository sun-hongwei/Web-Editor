import { Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  constructor(
    private element:ElementRef,
  ) { }

  ngOnInit() {
    this.getCanvas();
  }

  getCanvas() {
    this.getLine(4000, 'w');
    this.getLine(1600, 'h');
  }

  //刻度尺和刻度标注
  getLine(maxLine:number = 1500, status: string = 'w') {
    let _qEle = status === 'w' ? '#w-canvas' : '#h-canvas';
    let w_canvas = this.element.nativeElement.querySelector(_qEle);
    let _w = w_canvas.getContext('2d');
    _w.beginPath();
    _w.strokeStyle  = '#000';
    _w.lineWidth = 1;
    for(let i = -40; i < maxLine; i = i + 20) {
      if(status === 'w') {
        _w.moveTo(i, 0);
        if(i % 100 !== 0 ) {
          _w.lineTo(i, 8);
        } else if(i % 200 ===0 ){
          _w.lineTo(i, 15);
        } else {
          _w.font = '500 20px Tahoma';
          _w.fillText(`${(i-100)/2}`, i + 3, 24);
          _w.lineTo(i, 15);
        }
      } else {
        let _hi = i - 40;
        _w.moveTo(0, i);
        if(_hi % 100 !== 0 ) {
          _w.lineTo(8, i);
        } else {
          _w.font = '500 20px Tahoma';
          _w.fillText(`${_hi / 2}`, 10, i + 10);
          _w.lineTo(12, i);
        }
      }
    }
    _w.stroke();
    _w.closePath();
  }

}
