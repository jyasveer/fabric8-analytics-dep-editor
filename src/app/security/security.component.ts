import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import {
  TagInputModule
} from 'ngx-chips';
import {
  FormsModule
} from '@angular/forms';
import {
  AccordionModule
} from 'ngx-bootstrap';
import {
  CveResponseModel
} from '../model/data.model';

@Component({
  selector: 'app-security',
  styleUrls: ['./security.component.less'],
  templateUrl: './security.component.html'
})

export class SecurityComponent implements OnInit, OnChanges {
  @Input() cveData: CveResponseModel;

  public title = 'Security Alert';
  public icon = 'fa fa-shield';
  public noOfCves = 0;
  public hasIssue = false;
  public toHave = false;
  public secureIssue = false;
  public itSecurity = true;
  public cveName: any = [];

  constructor() {}

  ngOnChanges() {
    this.hasIssue = false;
    this.secureIssue = false;
    this.cveName = [];
    if (this.cveData) {
      this.noOfCves = 0;
      let count = -1;
      this.itSecurity = true;
      this.cveData.result.forEach(item => {
        count++;
        if (item.cve) {
          this.noOfCves++;
          this.hasIssue = true;
          this.secureIssue = true;
          console.log('count for cve', count);

          if (item.cve !== null) {
            this.cveName.push([
              item.cve.details, //cve: 
              item.package //package: 
            ]);
          }
        }
      });
      if (this.noOfCves > 0) {
        this.itSecurity = false;
      }
    } else {
      this.noOfCves = null;
    }
  }

  ngOnInit() {

  }

  public getShow(event) {
    this.toHave = event.toShow;
    console.log('show toHave variable', this.toHave);
  }

}