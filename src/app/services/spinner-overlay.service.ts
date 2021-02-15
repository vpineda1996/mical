import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from '../shared/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) {}
   
  public show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      if (!this.overlayRef) {
        this.overlayRef = this.overlay.create({
          positionStrategy: this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
          hasBackdrop: true,
        });
        this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
      }
    });
  }

  public hide(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }
}