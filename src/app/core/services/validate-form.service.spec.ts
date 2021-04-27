import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ValidateFormService } from './validate-form.service';
import { namesRegex } from '../utils';

describe('EmployeeService', () => {
  let service: ValidateFormService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [ValidateFormService, TranslateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(ValidateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getError', () => {

    const requiredError = {
      errors: { required: true }
    };

    const namesRegexError = {
      errors: {
        pattern: { requiredPattern: String(namesRegex) }
      }
    };

    const error1 = service.getError('Name', requiredError);
    const error2 = service.getError('Name', namesRegexError);
    const noFoundError = service.getError('Name', {errors: null});


    expect(error1).toBeTruthy();
    expect(error2).toBeTruthy();
    expect(noFoundError).toBeFalsy();
  });
});
