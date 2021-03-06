import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DEFAULT_LANG, EMPLOYEES_API_ENDPOINT, FORMAT_DATE } from '@core/constants';
import { Employee, QueryField } from '@core/models/employee.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class EmployeeService {
  private readonly employees$ = new BehaviorSubject<Employee[]>([]);

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public getAllEmployees(): void {
    this.httpClient
      .get<Employee[]>(EMPLOYEES_API_ENDPOINT)
      .subscribe((employees: Employee[]) => {
        this.employees$.next(employees);
      });
  }

  public get employeesStore$(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  public getEmployeesFiltered(query: string): void {
    query = query.toLocaleLowerCase();
    this.httpClient
      .get<Employee[]>(EMPLOYEES_API_ENDPOINT)
      .pipe(
        map((employees) =>
          employees.filter(
            (e) =>
              String(e.id).includes(query) ||
              e.name.toLocaleLowerCase().includes(query) ||
              e.surname.toLocaleLowerCase().includes(query) ||
              e.workPosition.toLocaleLowerCase().includes(query) ||
              formatDate(e.dateOfBirth, FORMAT_DATE, DEFAULT_LANG).includes(query)
          )
        )
      )
      .subscribe((employees: Employee[]) => {
        this.employees$.next(employees);
      });
  }

  public getEmployee(id: number): Observable<Employee> {
    const url = EMPLOYEES_API_ENDPOINT + `/${id}`;
    return this.httpClient.get<Employee>(url);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(EMPLOYEES_API_ENDPOINT, employee);
  }

  public editEmployee(employee: Employee): Observable<Employee> {
    const url = EMPLOYEES_API_ENDPOINT + `/${employee.id}`;
    return this.httpClient.put<Employee>(url, employee);
  }

  public deleteEmployee(employee: Employee): Observable<object> {
    const url = EMPLOYEES_API_ENDPOINT + `/${employee.id}`;
    return this.httpClient.delete(url);
  }
}
