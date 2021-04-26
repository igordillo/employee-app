import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';
import { ValidateFormService } from '@core/services/validate-form.service';
import { WorkPositionsService } from '@core/services/work-positions.service';
import { capitalizeText } from '@core/utils';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { namesRegex } from '../core/utils';

export declare type Action = 'Add' | 'Edit';

export interface EmployeeDialogData {
  action: Action;
  employee: Employee;
}

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormDialogComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  workPositions: string[] = [];
  maxDate = new Date();

  constructor(
    private readonly workPositionsService: WorkPositionsService,
    private readonly employeeService: EmployeeService,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData,
    private readonly translate: TranslateService,
    public readonly validateFormService: ValidateFormService,

  ) {}

  ngOnInit(): void {
    this.workPositionsService
      .getAllWorkPositions()
      .subscribe((positions: string[]) => (this.workPositions = positions));

    this.form = this.fb.group({
      name: [this.data.employee.name, [Validators.required, Validators.pattern(namesRegex)]],
      surname: [this.data.employee.surname, [Validators.required, Validators.pattern(namesRegex)]],
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
          const successMsg = this.translate.instant('UserCreatedMsg');
          this.close(true);
          this.toastr.success(successMsg);
        }
      });
    }

    if (this.data.action === 'Edit') {
      this.employeeService.editEmployee(employee).subscribe(() => {
        {
          const successMsg = this.translate.instant('UserUpdatedMsg');
          this.close(true);
          this.toastr.success(successMsg);
        }
      });
    }
  }

  close(actionCompleted: boolean = false): void {
    this.dialogRef.close(actionCompleted);
  }
}
