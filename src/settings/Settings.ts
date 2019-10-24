import { PersonSettings, DaySettings, SpanSettings, SkillSettings } from '.';

export interface Settings {
  personSettings: PersonSettings[];
  daySettings: DaySettings[];
  /**
   * If no skills are specified all other skill properties will be ignored
   */
  skillSettings?: SkillSettings[];
  /**
   * This is enfoced during the auto generation of the Calendar
   */
  oneSpanPerDay: boolean;
  defaultSpan: SpanSettings;
}
