import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-pop-hover',
  templateUrl: './pop-hover.component.html',
  styleUrls: ['./pop-hover.component.scss']
})
export class PopHoverComponent implements OnInit {

  @ViewChild('pophover')
  template: TemplateRef<any>;
  isOpen: boolean;

@Output()
  close = new EventEmitter();
  ngOnInit() { }

  closePophover() {
    this.close.emit();
  }

}

