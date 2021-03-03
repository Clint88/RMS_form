export interface Person {
  uid?: string;
  class: string;
  name: string;
  sex: string;
  height: number;
  weight: number;
  eyeColor: string;
  hairColor: string;
  dob: string;
  age: number;
  scars: Array<string>;
  tattoos: Array<string>;
  address: string;
  commonAddress: string;
  phone: string;
  gang: boolean;
  hazard: boolean;
  hazReason?: string;
  mugshotLink?: string;
  ssn: number;
  dln: string;
  dlnExp: string;
  addNotes?: string;
  creatorUid: string;
}
