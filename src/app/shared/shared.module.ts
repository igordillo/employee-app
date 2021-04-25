import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CoreModule } from '@core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,

    TranslateModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-full-width',
      enableHtml: true,
      preventDuplicates: true,
    }),
  ],
  exports: [FormsModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
