import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFitToWindow]'
})
export class FitToWindowDirective implements AfterViewInit {

  @Input('bottom-offset') bottomOffset: number;
  @Input('max-size') maxSize: number;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    let eBnds = this.el.nativeElement.getBoundingClientRect();
    let nHeight = Math.min(this.maxSize, Math.max(50, window.innerHeight - eBnds.y - (this.bottomOffset ? this.bottomOffset : 0)));
    this.renderer.setStyle(this.el.nativeElement, "max-height",  nHeight + "px");
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

}
