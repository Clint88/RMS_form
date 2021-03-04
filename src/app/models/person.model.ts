export interface Person {
  code: string;
  firstN: string;
  lastN: string;
  middleN: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  ssn: number;
  dln: string;
  dlnExp: string;
  height: number;
  weight: number;
  age: number;
  phone: string;
  sex: string;
  race: string;
  eyeColor: string;
  hairColor: string;
  scars: Array<string>;
  marks: Array<string>;
  tattoos: Array<string>;
  gang: boolean;
  hazard: boolean;
  hazReason?: string;
  mugshotLink?: string;
  addNotes?: string;
  creatorUid: string;
}
