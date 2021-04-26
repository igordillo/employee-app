import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { of } from 'rxjs';
import { EMPLOYEES_API_ENDPOINT } from '../constants';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmployeeService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new EmployeeService(httpClientSpy as any)
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllEmployes', () => {
    const emplooyees: Employee[] = [
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

    httpClientSpy.get.and.returnValue(of(emplooyees));

    service.getAllEmployees();

    service.employeesStore$.subscribe(resp => {
      expect(resp).toEqual(emplooyees);
    })

  })

  it('getEmployeesFiltered', () => {
    const emplooyees: Employee[] = [
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

    const emplooyeesFiltered: Employee[] = [
      {
        "id": 1,
        "name": "Isaac",
        "surname": "Gordillo gómezasd",
        "workPosition": "full-stack developer",
        "dateOfBirth": "1990-12-20T23:00:00.000Z"
      }
    ];

    httpClientSpy.get.and.returnValue(of(emplooyees));

    service.getEmployeesFiltered('Isaac');

    service.employeesStore$.subscribe(resp => {
      expect(resp).toEqual(emplooyeesFiltered);
    })
  })
});
