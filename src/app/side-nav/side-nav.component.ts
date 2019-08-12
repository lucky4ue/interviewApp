import {
  Component,
  OnInit
} from '@angular/core';
import { ResponsiveService } from '../responsive.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  constructor(public _responsiveService: ResponsiveService) {}
  ngOnInit() { }
  onMenuClick() {
    console.log(window.screen.width);
    if (window.screen.width < 768) {
      this._responsiveService.isMobile = false;
    }
  }
}

