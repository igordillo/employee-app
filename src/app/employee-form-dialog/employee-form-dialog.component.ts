import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';
import { WorkPositionsService } from '@core/services/work-positions.service';
import { capitalizeText } from '@core/utils';
import { ToastrService } from 'ngx-toastr';

export declare type Action = 'Add' | 'Edit';

export interface EmployeeDialogData {
  action: Action;
  employee: Employee;
}

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss'],
})
export class EmployeeFormDialogComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  workPositions: string[] = [];

  constructor(
    private readonly workPositionsService: WorkPositionsService,
    private readonly employeeService: EmployeeService,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData
  ) {}

  ngOnInit(): void {
    this.workPositionsService
      .getAllWorkPositions()
      .subscribe((positions: string[]) => (this.workPositions = positions));

    this.form = this.fb.group({
      name: [this.data.employee.name, Validators.required],
      surname: [this.data.employee.surname, Validators.required],
      dateOfBirth: [
        new Date(this.data.employee.dateOfBirth),
        Validators.required,
      ],
      workPosition: [this.data.employee.workPosition, Validators.required],
    });
  }

  save(): void {
    const formData = this.form.getRawValue();
    const employee: Employee = {
      id: this.data.employee.id,
      name: capitalizeText(formData.name),
      surname: capitalizeText(formData.surname),
      workPosition: formData.workPosition,
      dateOfBirth: formData.dateOfBirth,
    };

    if (this.data.action === 'Add') {
      this.employeeService.addEmployee(employee).subscribe(() => {
        {
          this.close(true);
          this.toastr.success('User was created successfuly');
        }
      });
    }

    if (this.data.action === 'Edit') {
      this.employeeService.editEmployee(employee).subscribe(() => {
        {
          this.close(true);
          this.toastr.success('User was edited successfuly');
        }
      });
    }
  }

  close(actionCompleted: boolean = false): void {
    this.dialogRef.close(actionCompleted);
  }
}