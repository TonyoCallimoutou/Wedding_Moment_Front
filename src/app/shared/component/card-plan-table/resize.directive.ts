import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {
  oldY = 0;
  isGrabbing = false;

  @Input() height: number = 0
  @Output() heightChange = new EventEmitter<number>();

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isGrabbing) {
      return;
    }
    this.height += (event.clientY - this.oldY);
    this.heightChange.emit(this.height);
    this.oldY = event.clientY;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isGrabbing = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isGrabbing = true;
    this.oldY = event.clientY;
  }
}
