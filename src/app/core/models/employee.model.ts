export interface Employee {
  id?: number;
  name: string;
  surname: string;
  dateOfBirth: string;
  workPosition: string;
}

export type QueryField = 'name' | 'surname' | 'workPosition';
