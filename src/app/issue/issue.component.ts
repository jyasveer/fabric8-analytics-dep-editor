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

@Component({
  selector: 'app-issue',
  styleUrls: ['./issue.component.less'],
  templateUrl: './issue.component.html'
})

export class IssueComponent implements OnInit, OnChanges {
  @Input() issueName: string;
  @Input() issueSymbol: string;
  @Input() issueStatus: string | number;
  @Input() hasIssue: boolean;
  @Input() responseReady: boolean;
  @Output() notifyParent: EventEmitter<boolean> = new EventEmitter();

  public isLoading = false;

  public toShow = false;
  constructor() {}

  ngOnChanges() {
    if (this.issueStatus === null) {
      this.isLoading = true;
    } else if (typeof this.issueStatus === 'string' && this.issueStatus) {
      this.isLoading = false;
    } else if (typeof this.issueStatus === 'number') {
      this.isLoading = false;
    }
  }

  ngOnInit() {

  }

  
  
}
