import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-pop-hover',
  templateUrl: './pop-hover.component.html',
  styleUrls: ['./pop-hover.component.scss']
})
export class PopHoverComponent implements OnInit {

  @ViewChild('autoComplete')
  template: TemplateRef<any>;
  ngOnInit() { }

}

