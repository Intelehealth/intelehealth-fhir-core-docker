import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MindmapService } from 'src/app/services/mindmap.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { CoreService } from 'src/app/services/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { PageTitleService } from 'src/app/core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { getCacheData } from 'src/app/utils/utility-functions';
import { languages } from 'src/config/constant';
import { ApiResponseModel, UploadMindmapResponseModel, MindmapKeyModel, MindmapModel } from 'src/app/model/model';

@Component({
  selector: 'app-ayu',
  templateUrl: './ayu.component.html',
  styleUrls: ['./ayu.component.scss']
})
export class AyuComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'updatedAt', 'active', 'download', 'info'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  mindmaps: MindmapKeyModel[] = [];
  mindmapDatas: MindmapModel[] = [];
  selectedLicense: string;
  expiryDate: string;

  constructor(
    private mindmapService: MindmapService,
    private coreService: CoreService,
    private toastr: ToastrService,
    private pageTitleService: PageTitleService,
    private translateService: TranslateService) { }

  /**
  * OnInit Callback
  * @return {void}
  */
  ngOnInit(): void {
    this.translateService.use(getCacheData(false, languages.SELECTED_LANGUAGE));
    this.pageTitleService.setTitle({ title: 'Ayu', imgUrl: 'assets/svgs/ayu.svg', info: true })
    this.fetchMindmaps();
  }

  /**
  * Downloads a mindmap in JSON format
  * @param {string} json - JSON object for the mindmap
  * @param {string} exponent - name to be given for the downloaded JSON mindmap file
  * @return {void}
  */
  downloadMindmap(json: string, name: string) {
    let sJson = JSON.stringify(JSON.parse(json));
    let element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', name);
    element.click();
  }

  /**
  * Get all license keys from the server
  * @return {void}
  */
  fetchMindmaps(): void {
    this.mindmapService.getMindmapKey().subscribe(
      (response: ApiResponseModel) => {
        this.mindmaps = response.data;
        this.selectedLicense = this.mindmaps[0].keyName
        this.licenceKeySelecter();
      },
      (err) => {
        console.log("Something went wrong");
      }
    );
  }

  /**
  * Get lsit of available mindmaps for the selected license key.
  * @return {void}
  */
  licenceKeySelecter(): void {
    this.mindmapService.detailsMindmap(this.selectedLicense).subscribe(
      (response: ApiResponseModel) => {
        this.mindmapDatas = response.data;
        this.dataSource = new MatTableDataSource(this.mindmapDatas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter: string) => data.name.toLowerCase().includes(filter);
        const { expiry } = this.mindmaps.find(
          (m) => m.keyName === this.selectedLicense
        );
        this.expiryDate = expiry;
      },
      (err) => {
        console.log("Something went wrong");
      }
    );
  }

  /**
  * Open Upload Json Mindmap Modal.
  * @return {void}
  */
  openUploadMindmapModal() {
    this.coreService.openUploadMindmapModal().subscribe((result: UploadMindmapResponseModel) => {
      if (result) {
        if (result.filename && result.value) {
          result.key = this.selectedLicense;
          this.mindmapService.postMindmap(result).subscribe((res: ApiResponseModel) => {
            if (res.success) {
              this.mindmapDatas.push(res.data);
              this.dataSource = new MatTableDataSource(this.mindmapDatas);
              this.dataSource.paginator = this.paginator;
              this.toastr.success(`${result.filename} ${this.translateService.instant('has been uploaded successfully!')}`, this.translateService.instant('Mindmap Uploaded'));
            } else {
              this.toastr.error(`${this.translateService.instant('Failed to upload')} ${result.filename}`, this.translateService.instant('Mindmap Upload Failed'));
            }
          });
        }
      }
    });
  }

  /**
  * Open the Add/Edit License Key Modal.
  * @param {string} mode - mode in which modal should open (add/edit)
  * @return {void}
  */
  openAddLicenseKeyModal(mode: string) {
    let licKey = this.mindmaps.find((m) => m.keyName === this.selectedLicense);
    this.coreService.openAddLicenseKeyModal((mode == 'edit') ? licKey : null).subscribe((result: MindmapKeyModel) => {
      if (result) {
        if (mode == 'edit') {
          this.mindmaps.forEach((m: MindmapKeyModel) => {
            if (m.keyName == result.keyName) {
              this.expiryDate = result.expiry;
            }
          });
        } else {
          this.mindmaps.push(result);
        }
        this.toastr.success(`${this.translateService.instant('License Key')} ${result.keyName} ${this.translateService.instant('has been')}
        ${mode == 'add' ? this.translateService.instant('added') : this.translateService.instant('updated')}
        ${this.translateService.instant('successfully')}!`, `${this.translateService.instant('License Key')}
        ${mode == 'add' ? this.translateService.instant('added') : this.translateService.instant('updated')}`);
      }
    });
  }

  /**
  * Check whether the number of selected elements matches the total number of rows.
  * @return {boolean} - Returns true/false whether the number of selected elements matches the total number of rows
  */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
  * Select all rows if they are not all selected; otherwise clear selection.
  * @return {void}
  */
  masterToggle() {
    if (this.isAllSelected()) {
      this.clearSelection();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /**
  * Get the label for the checkbox on the passed row
  * @return {string} - Label for the checkbox on the passed row
  */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**
  * Delete selected mindmap protocol.
  * @return {void}
  */
  deleteMindmap() {
    this.mindmapService.deleteMindmap(this.selection.selected[0].keyName, { mindmapName: this.selection.selected[0].name })
      .subscribe((res: ApiResponseModel) => {
        if (res) {
          this.toastr.success(this.translateService.instant(res.message), this.translateService.instant("Mindmap Deleted"));
          this.clearSelection();
          this.licenceKeySelecter();
        } else {
          this.toastr.error(this.translateService.instant("Something went wrong"), this.translateService.instant("Mindmap Delete Failed"));
        }
      });
  }

  /**
  * Toggle status of the selected mindmap protocol.
  * @param {MindmapModel} mindmap - Mindmap protocol
  * @return {void}
  */
  toggleStatus(mindmap: MindmapModel) {
    this.mindmapService.toggleMindmapStatus({ mindmapName: mindmap.name, keyName: mindmap.keyName })
      .subscribe((res: ApiResponseModel) => {
        if (res.success) {
          this.toastr.success(this.translateService.instant(res.message), this.translateService.instant("Mindmap Status Updated"));
        } else {
          this.toastr.error(this.translateService.instant("Something went wrong"), this.translateService.instant("Mindmap Update Failed"));
        }
      });
  }

  /**
  * Apply filter
  * @param {Event} event - Input's change event
  * @return {void}
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Clear selection for the rows selected
  * @return {void}
  */
  clearSelection() {
    this.selection.clear();
  }

}
