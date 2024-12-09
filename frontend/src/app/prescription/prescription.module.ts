import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionComponent } from './prescription.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SentComponent } from './sent/sent.component';
import { CompletedComponent } from './completed/completed.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatPaginationIntlService } from '../services/mat-pagination.service';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    PrescriptionComponent,
    SentComponent,
    CompletedComponent
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    NgbNavModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginationIntlService },
  ]
})
export class PrescriptionModule { }
