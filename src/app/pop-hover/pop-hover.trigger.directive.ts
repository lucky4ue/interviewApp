import { Directionality } from '@angular/cdk/bidi';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  RepositionScrollStrategy,
  CdkScrollable } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  OnInit,
  OnDestroy,
  Optional,
  Inject,
  ViewContainerRef,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { first } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/platform-browser';
import { PopHoverComponent } from './pop-hover.component';

@Directive({
  selector: '[appHoverTrigger]',
  exportAs: 'appHoverTrigger'
})

export class PopHoverTriggerDirective implements OnInit, OnDestroy {
  _closeSubscription: any;
  private _overlayRef: OverlayRef;
@Input()
  pophover: PopHoverComponent;

  constructor(
    @Inject(DOCUMENT)
    private _document: Document,
    private _host: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _directionality: Directionality,
    private _overlay: Overlay,
    @Inject(CdkScrollable)
    @Optional()
    private scrollableContainerList: CdkScrollable[]
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
    }

    if (this._overlayRef) {
      this._overlayRef.detach();
      this._overlayRef.dispose();
    }
  }

  open() {
    if (!this.pophover.isOpen) {
      if (!this._overlayRef) {
        this._setupOverlay();
      }
      this._setupOverlayCloser();
      this._openOverlay();
    }
  }

  close() {
    this._closeOverlay();
  }

    @HostListener('click')
  whenFocused() {
      this.open();
  }

  private _setupOverlay() {
    const positionStrategy = this._overlay.position().connectedTo(this._host, {
      originX: 'start',
      originY: 'bottom'
    }, {
      overlayX: 'start',
      overlayY: 'top'
    })
    .withFallbackPosition({
      originX: 'start',
      originY: 'top'
    }, {
      overlayX: 'start',
      overlayY: 'bottom'
    })
    .withDirection(this._directionality.value);

    if (this.scrollableContainerList) {
      const scrollableContainerList = (this.scrollableContainerList instanceof Array) ?
        this.scrollableContainerList :
        [this.scrollableContainerList];
      positionStrategy.withScrollableContainers(scrollableContainerList);
    }

    const scrollStrategy = this._overlay.scrollStrategies.reposition();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
      scrollStrategy,
    });

    this._overlayRef = this._overlay.create(overlayConfig);
  }


  private _closeOverlay() {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this.pophover.isOpen = false;
    }
  }

  private _openOverlay() {
    this._overlayRef.detach();
    const acPortal = new TemplatePortal(
      this.pophover.template,
      this._viewContainer
    );
    this._overlayRef.attach(acPortal);
    this.pophover.isOpen = true;
  }

  private _setupOverlayCloser() {
    this._setupOverlayCloserForOutsideClick();
  }

  /**
   * Sets up a document listener that closes the overlay
   * whenever there's a click outside of overlay (the autocomplete)
   */
  private _setupOverlayCloserForOutsideClick() {
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
    }
    const closeSub = fromEvent(this._document, 'click').pipe(
      filter(
        (event: MouseEvent) => {
          const eventTarget = event.target;
          return (eventTarget !== this._host.nativeElement) &&
                  (this._overlayRef &&
                  !this._overlayRef.overlayElement.contains(eventTarget as Node));
        }
      )
    ).subscribe(
      () => {
        if (this.pophover.isOpen) {
          this._closeOverlay();
          // emits an event when autocomplete overlay is closed
          // this.whenClosed.emit();
        }
        closeSub.unsubscribe();
      }
    );
    this._closeSubscription = closeSub;
  }

}
