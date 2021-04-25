import { Component, OnInit } from '@angular/core';
import { DEFAULT_LANG } from '@core/constants';
import { Employee, QueryField } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, scheduled } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'employee-app';
  public employeesList$: Observable<Employee[]> = of(new Array<Employee>());

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.addLangs([DEFAULT_LANG, 'es']);
    this.translateService.setDefaultLang(DEFAULT_LANG);

    this.employeeService.getAllEmployees();
    this.employeesList$ = this.employeeService.employeesStore$;
  }
}
