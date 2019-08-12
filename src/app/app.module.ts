import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TruncateModule } from 'ng2-truncate';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BackchargesComponent } from './backcharges/backcharges.component';
import { ResponsiveService } from './responsive.service';

@NgModule({
  declarations: [
    AppComponent,
    SpotlightComponent,
    SideNavComponent,
    BackchargesComponent
  ],
  imports: [
    BrowserModule,
    TruncateModule
  ],
  providers: [
    ResponsiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
