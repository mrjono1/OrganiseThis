import { Availability } from '.';

export interface PersonSettings {
  id: number;
  name: string;
  availability?: Availability;
  fixedShiftsIds?: number[];
}
