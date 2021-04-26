import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ValidateFormService } from './services/validate-form.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    EmployeeService,
    ValidateFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
