import { formatDate } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DEFAULT_LANG, FORMAT_DATE } from '@core/constants';
import { EmployeeService } from '@core/services/employee.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import {
  EmployeeDialogData,
  EmployeeFormDialogComponent,
} from './employee-form-dialog.component';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material.module';
import { ValidateFormService } from '../core/services/validate-form.service';
import { Employee } from '@core/models/employee.model';
import { WorkPositionsService } from '../core/services/work-positions.service';

describe('EmployeeFormDialogComponent', () => {
  let component: EmployeeFormDialogComponent;
  let fixture: ComponentFixture<EmployeeFormDialogComponent>;
  let employeeService: EmployeeService;
  let workPositionsService: WorkPositionsService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeFormDialogComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        EmployeeService,
        TranslateService,
        ValidateFormService,
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: dataDialog }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormDialogComponent);
    component = fixture.componentInstance;
    employeeService = fixture.debugElement.injector.get(EmployeeService);
    workPositionsService = fixture.debugElement.injector.get(WorkPositionsService);
    spyOn(workPositionsService, 'getAllWorkPositions').and.callFake(() => of(['full-stack developer', 'scrum master']));

    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add and Edit an Employee', () => {
    const employee: Employee = {
      id: 1,
      name: 'name',
      surname: 'surname',
      workPosition: 'front developer',
      dateOfBirth: new Date().toLocaleDateString(),
    };

    component.data = {
      action: 'Add',
      employee
    }

    const response: Employee[] = [
      {
        id: 1,
        name: 'name',
        surname: 'surname',
        workPosition: 'front developer',
        dateOfBirth: new Date().toLocaleDateString(),
      }
    ]

    spyOn(component, 'close');
    spyOn(employeeService, 'addEmployee').and.returnValue(of(employee));
    spyOn(employeeService, 'editEmployee').and.returnValue(of(employee));

    const spyComponent = spyOn(component, 'save').and.callThrough();


    component.save()
    expect(spyComponent).toHaveBeenCalled();

    component.data.action = 'Edit';
    component.save();
    expect(spyComponent).toHaveBeenCalled();
  })

});
