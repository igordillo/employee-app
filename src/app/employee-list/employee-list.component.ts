import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FORMAT_DATE } from '@core/constants';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {
  Action,
  EmployeeDialogData,
  EmployeeFormDialogComponent,
} from '../employee-form-dialog/employee-form-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {

  @Input() set employees(value: Employee[] | null) {
    this._employees = value;
    this.collectionSize = value ? value.length : 0;
    this.refreshEmployees();
  }

  @ViewChild('ngbPagination') pagination: NgbPagination | undefined;

  public employeesDataTable: Employee[] = [];
  // tslint:disable-next-line: variable-name
  public FORMAT_DATE = FORMAT_DATE;

  public searchInput = '';
  public page = 1;
  public pageSize = 4;
  public collectionSize = 0;

  private _employees: Employee[] | null = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly dialog: MatDialog,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService
  ) {
    this.refreshEmployees();
  }

  ngOnInit(): void { }

  onRefreshButton(): void {
    this.employeeService.getAllEmployees();
    this.searchInput = '';
  }

  refreshEmployees(): void {
    if (this._employees) {
      this.employeesDataTable = this._employees
        .map((employee, i) => ({ id: i + 1, ...employee }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    }
  }

  reloadAndFilterEmployees(): void {
    this.searchInput
      ? this.employeeService.getEmployeesFiltered(this.searchInput)
      : this.employeeService.getAllEmployees();
  }

  onAddButon(): void {
    const emptyEmployee: Employee = {
      name: '',
      surname: '',
      dateOfBirth: '',
      workPosition: '',
    };

    this.openEmployeeDialog('Add', emptyEmployee);
  }

  onEditButton(employee: Employee): void {
    this.openEmployeeDialog('Edit', employee);
  }

  onDeleteButton(employee: Employee): void {
    const data: ConfirmDialogData = {
      title: this.translate.instant('Delete'),
      text: this.translate.instant('DeleteText'),
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployee(employee).subscribe(() => {
          const successMsg = this.translate.instant('DeleteSuccess');
          this.toastr.success(successMsg);
          this.reloadAndFilterEmployees();
        });
      }
    });
  }

  private openEmployeeDialog(action: Action, employee: Employee): void {
    const data: EmployeeDialogData = {
      action,
      employee,
    };

    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '500px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((actionCompleted: boolean) => {
      if (actionCompleted) {
        this.reloadAndFilterEmployees();
        if (action === 'Add') {
          this.page = this.pagination ? this.pagination.pageCount + 1 : 0;
        }
      }
    });
  }
}
