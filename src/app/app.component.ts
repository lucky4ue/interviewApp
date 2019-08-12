import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ResponsiveService } from './responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'app';
  isMenuClicked: boolean;

  constructor(public _responsiveService: ResponsiveService) { }

  ngOnInit() {
  }
}
