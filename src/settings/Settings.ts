import { PersonSetting, DaySetting } from '.';

export interface Settings {
  personSettings: PersonSetting[];
  daySettings: DaySetting[];
  /**
   * This is enfoced during the auto generation of the Calendar
   */
  oneSpanPerDay: boolean;
}
