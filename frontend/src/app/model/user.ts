export class User {
  [k: string]: any;
  id: number | string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  role: 1 | 2 | 3 = 1;
  password: string = '';
}
