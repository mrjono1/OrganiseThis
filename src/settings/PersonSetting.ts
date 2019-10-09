import { Availability } from '.';

export interface PersonSetting {
  id: number;
  name: string;
  availability?: Availability;
}
