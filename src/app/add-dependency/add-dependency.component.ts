import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy,
  ViewChild
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
  ComponentInformationModel,
  DependencySearchItem,
  DependencySnapshotItem
} from '../model/data.model';
import {
  DependencyEditorService
} from '../shared/dependency-editor.service';

@Component({
  selector: 'app-add-dependency',
  styleUrls: ['./add-dependency.component.less'],
  templateUrl: './add-dependency.component.html'
})

export class AddDependencyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dependencies: Array < ComponentInformationModel > ;
  @Input() existDependencies: Array<DependencySnapshotItem>;
  @ViewChild('PackagePreview') modalPackagePreview : any;
  
  public dependencySearchString: string;
  public dependencySearchResult: Array < DependencySearchItem > = [];
  public isLoading = false;

  // private searchDepsUrl = 'https://recommender.api.openshift.io/api/v1/component-search/';
  private searchDepsUrl = 'http://bayesian-api-bayesian-preview.b6ff.rh-idev.openshiftapps.com/api/v1/component-search/';

  constructor(private service: DependencyEditorService) {}

  ngOnInit() {

  }

  ngOnChanges() {
    console.log(this.dependencies);
  }

  getDependencies() {
    this.isLoading = true;
    this.service.getDependencies(this.searchDepsUrl + this.dependencySearchString)
      .subscribe((response: any) => {
        this.dependencySearchResult = response['result'];
        this.isLoading = false;
      });
  }

  listenInputSearch() {
    if (this.dependencySearchString === '') {
      this.dependencySearchResult = [];
    }
  }

  addDependency(depItem: DependencySearchItem) {
    this.dependencySearchResult = [];
    this.dependencySearchString = '';
    this.service.dependencySelected.emit(depItem);
  }

  ngOnDestroy() {
    this.dependencies = [];
    this.dependencySearchResult = [];
    this.dependencySearchString = '';
    this.isLoading = false;
  }
  
  removeDependency(dependency) {
    this.service.removeDependency(dependency);console.log("remove of added dependency",dependency);
  }

  public showPackageModal(event: Event) {
    this.modalPackagePreview.open();
  }
  public closemodal(){
    this.modalPackagePreview.close();
  }
}
