import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLicenseKeyComponent } from './add-license-key/add-license-key.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadMindmapJsonComponent } from './upload-mindmap-json/upload-mindmap-json.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharePrescriptionComponent } from './share-prescription/share-prescription.component';
import { SharePrescriptionSuccessComponent } from './share-prescription-success/share-prescription-success.component';
import { SharePrescriptionErrorComponent } from './share-prescription-error/share-prescription-error.component';
import { ViewVisitSummaryComponent } from './view-visit-summary/view-visit-summary.component';
import { ViewVisitPrescriptionComponent } from './view-visit-prescription/view-visit-prescription.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MomentModule } from 'ngx-moment';
import { VideoCallComponent } from './video-call/video-call.component';
import { SearchedPatientsComponent } from './searched-patients/searched-patients.component';
import { MatListModule } from '@angular/material/list';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { RescheduleAppointmentConfirmComponent } from './reschedule-appointment-confirm/reschedule-appointment-confirm.component';
import { CancelAppointmentConfirmComponent } from './cancel-appointment-confirm/cancel-appointment-confirm.component';
import { AppointmentDetailMonthComponent } from './appointment-detail-month/appointment-detail-month.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmDayOffComponent } from './confirm-day-off/confirm-day-off.component';
import { ConfirmHoursOffComponent } from './confirm-hours-off/confirm-hours-off.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PwaPromptComponent } from './pwa-prompt/pwa-prompt.component';
import { ConfirmOpenmrsIdComponent } from './confirm-openmrs-id/confirm-openmrs-id.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { VcallOverlayComponent } from './vcall-overlay/vcall-overlay.component';

@NgModule({
    declarations: [
        AddLicenseKeyComponent,
        UploadMindmapJsonComponent,
        NoInternetComponent,
        PasswordResetSuccessComponent,
        HelpMenuComponent,
        SelectLanguageComponent,
        ConfirmDialogComponent,
        SharePrescriptionComponent,
        SharePrescriptionSuccessComponent,
        SharePrescriptionErrorComponent,
        ViewVisitSummaryComponent,
        ViewVisitPrescriptionComponent,
        ChatBoxComponent,
        VideoCallComponent,
        SearchedPatientsComponent,
        AppointmentDetailComponent,
        RescheduleAppointmentComponent,
        RescheduleAppointmentConfirmComponent,
        CancelAppointmentConfirmComponent,
        AppointmentDetailMonthComponent,
        ImagesPreviewComponent,
        ConfirmDayOffComponent,
        ConfirmHoursOffComponent,
        PwaPromptComponent,
        ConfirmOpenmrsIdComponent,
        RaiseTicketComponent,
        ImageCropComponent,
        VcallOverlayComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        NgxDropzoneModule,
        MomentModule,
        MatListModule,
        MatDatepickerModule,
        PdfViewerModule,
        SharedModule,
        NgSelectModule,
        SignaturePadModule,
        ImageCropperModule,
        SharedModule
    ],
    exports: [ViewVisitPrescriptionComponent]
})
export class ModalComponentsModule { }
