export interface Incident {
  uid?: string;
  reportId: string;
  codeName: string;
  location: string;
  narrative: string;
  vehicles: Array<string>;
  persons: Array<string>;
  officerName: string;
  officerId: string;
  occurances: Array<string>;
  commonLocation: string;
  creatorUid: string;
}
