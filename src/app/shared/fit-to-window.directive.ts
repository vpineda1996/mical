import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Directive({
  selector: '[appFitToWindow]'
})
export class FitToWindowDirective implements AfterViewInit {

  @Input('bottom-offset') bottomOffset: number;
  @Input('max-size') maxSize: number;

  debouncer = new Subject();

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.debouncer.pipe(debounceTime(100)).subscribe(this._debouncedCalculation.bind(this));
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.debouncer.next();
  }

  ngAfterViewInit(): void {
    this.debouncer.next();
  }

  private _debouncedCalculation(){
    let eBnds = this.el.nativeElement.getBoundingClientRect();
    let nHeight = Math.min(this.maxSize, Math.max(50, window.innerHeight - eBnds.y - (this.bottomOffset ? this.bottomOffset : 0)));
    this.renderer.setStyle(this.el.nativeElement, "max-height",  nHeight + "px");
  }



}
