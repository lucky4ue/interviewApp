import {
  Component,
  OnInit
} from '@angular/core';
import { ResponsiveService } from '../responsive.service';
@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss']
})
export class SpotlightComponent implements OnInit {
  userName: string;

   constructor(public _responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.userName = 'Lasiter & Lasiter Plumbing';
  }

  toggleMenu() {
    this._responsiveService.isMobile = !this._responsiveService.isMobile;
  }
}

