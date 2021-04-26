import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDialogData, EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';
import { formatDate } from '@angular/common';
import { DEFAULT_LANG, FORMAT_DATE } from '@core/constants';
import { MaterialModule } from '../shared/material/material.module';
import { ValidateFormService } from '../core/services/validate-form.service';


let translations: any = { "CARDS_TITLE": "This is a test" };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

const employees: Employee[] = [
  {
    "id": 1,
    "name": "Isaac",
    "surname": "Gordillo gómezasd",
    "workPosition": "full-stack developer",
    "dateOfBirth": "1990-12-20T23:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Sara",
    "surname": "Lopez",
    "workPosition": "full-stack developer",
    "dateOfBirth": "2021-04-28T22:00:00.000Z"
  },
];

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const dataDialog: EmployeeDialogData = {
  action: 'Add',
  employee: {
    name: 'name',
    surname: 'surname',
    workPosition: '',
    dateOfBirth: formatDate(new Date(), FORMAT_DATE, DEFAULT_LANG),
  },
};

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent, EmployeeFormDialogComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),
        ToastrModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [EmployeeService, TranslateService, ValidateFormService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    employeeService = fixture.debugElement.injector.get(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('refreshEmployees', () => {


    component.employees = employees;

    component.pageSize = 1;
    component.refreshEmployees();

    expect(component.employeesDataTable.length).toEqual(1);
  })

  it('onRefreshButton', () => {
    const spy = spyOn(employeeService, 'getAllEmployees').and.callFake(() => null);

    component.onRefreshButton();

    expect(spy).toHaveBeenCalled();
  })

  it('onAddButon', () => {
    const spy = spyOn(component, 'onAddButon').and.callThrough();
    component.onAddButon();
    expect(spy).toHaveBeenCalled();

  })

  it('onEditButton', () => {
    const employee: Employee = {
      "id": 1,
      "name": "Isaac",
      "surname": "Gordillo gómezasd",
      "workPosition": "full-stack developer",
      "dateOfBirth": "1990-12-20T23:00:00.000Z"
    };
    const spy = spyOn(component, 'onEditButton').and.callThrough();
    component.onEditButton(employee);
    expect(spy).toHaveBeenCalled();
  })

  it('reloadAndFilterEmployees', ()=>{

    spyOn(employeeService, 'getAllEmployees').and.callFake(() => of(employees));
    spyOn(employeeService, 'getEmployeesFiltered').and.callFake(() => of(employees));

    const spy = spyOn(component, 'reloadAndFilterEmployees').and.callThrough();

    component.reloadAndFilterEmployees();

    component.searchInput = 'Isaac';

    component.reloadAndFilterEmployees();

    expect(spy).toHaveBeenCalled();
  });
});

