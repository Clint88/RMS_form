export interface Vehicle {
  vin?: string;
  plate?: string;
  plateState?: string;
  color?: string;
  make?: string;
  model?: string;
  year?: number;
  value?: string;
  owners: Array<string>;
  currentOwner: string;
  addNotes?: string;
  creatorUid: string;
}
