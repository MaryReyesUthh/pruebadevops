export interface ClienteModelo {
  _id: any;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

export interface DumpModel {
  _id: any;
  date: Date;
}
export interface RestoreModel {
  _id: any;
  date: Date;
}
