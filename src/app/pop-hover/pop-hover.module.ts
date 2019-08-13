import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopHoverComponent } from './pop-hover.component';
import { PopHoverTriggerDirective } from './pop-hover.trigger.directive';

const _exports = [
  PopHoverComponent,
  PopHoverTriggerDirective
];

@NgModule({
  imports: [
    OverlayModule
  ],
  declarations: _exports,
  exports: _exports
})
export class PopHoverModule {

}
