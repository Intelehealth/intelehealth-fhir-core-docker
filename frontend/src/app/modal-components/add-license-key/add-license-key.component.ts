import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MindmapService } from 'src/app/services/mindmap.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { getCacheData } from 'src/app/utils/utility-functions';
import { languages } from 'src/config/constant';
import { ApiResponseModel } from 'src/app/model/model';

@Component({
  selector: 'app-add-license-key',
  templateUrl: './add-license-key.component.html',
  styleUrls: ['./add-license-key.component.scss']
})
export class AddLicenseKeyComponent implements OnInit {

  licenseForm: FormGroup;
  submitted: boolean = false;
  today: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<AddLicenseKeyComponent>,
    private mindmapService: MindmapService,
    private translateService: TranslateService) {
    this.licenseForm = new FormGroup({
      key: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.translateService.use(getCacheData(false, languages.SELECTED_LANGUAGE));
    this.today = new Date().toISOString().slice(0, 10);
    this.licenseForm.patchValue({
      key: this.data?.keyName,
      expiryDate: moment(this.data?.expiry).format("YYYY-MM-DD")
    });
  }

  get f() { return this.licenseForm.controls; }

  /**
  * Close modal
  * @return {void}
  */
  close() {
    this.dialogRef.close(false);
  }

  /**
  * Add new license key
  * @return {void}
  */
  addLicenseKey() {
    this.submitted = true;
    if (this.licenseForm.invalid) {
      return;
    }
    this.mindmapService.addUpdateLicenseKey(this.licenseForm.value).subscribe((res: ApiResponseModel) => {
      if (res.success) {
        this.dialogRef.close(res.data);
      } else {
        this.dialogRef.close(false);
      }
    });
  }
}
