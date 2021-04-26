import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { namesRegex } from '../utils';

@Injectable()
export class ValidateFormService {
  constructor(private readonly translate: TranslateService) {}

  /**
   * If field has errors, return an error message explaining it. An empty string if it has not.
   *
   * @param name Field name
   * @param field Field object
   */
  getError(name: string, field: any): string {
    name = this.translate.instant(name);

    if (field.errors) {
      if (field.errors.required) {
        return this.translate.instant('ValidationRequired', {field: name});
      } else if (field.errors.pattern.requiredPattern === String(namesRegex)){
        return this.translate.instant('ValidationInvalidName', {field: name});
      }
    }

    return '';
  }

}
