import {  Component,  OnInit,  OnChanges,  Input,  Output,  EventEmitter,  ViewEncapsulation } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { DependencySnapshotItem, CveResponseModel, StackLicenseAnalysisModel } from '../model/data.model';

@Component({
  selector: 'app-current-project',
  styleUrls: ['./current-project.component.less'],
  templateUrl: './current-project.component.html'
})

export class CurrentprojectComponent implements OnInit, OnChanges {
  @Input() dependencies: Array<DependencySnapshotItem>;
  @Input() metadata: any;
  @Input() licenseData: StackLicenseAnalysisModel;
  @Input() cveData: CveResponseModel;
  @Input() allLicenses: Array<any> = [];

  public projectDependencies: string[]  ;
  public isOpen = false;
  public upDown = 'fa fa-angle-up';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.dependencies);
  }
}
