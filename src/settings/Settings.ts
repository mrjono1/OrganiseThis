import { PersonSettings, DaySettings, SpanSettings } from '.';

export interface Settings {
  personSettings: PersonSettings[];
  daySettings: DaySettings[];
  /**
   * This is enfoced during the auto generation of the Calendar
   */
  oneSpanPerDay: boolean;
  defaultSpan: SpanSettings;
}
