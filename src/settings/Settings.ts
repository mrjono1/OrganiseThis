import { PersonSetting, DaySetting, SpanSetting, SkillSetting } from '.';
import { RoomSetting } from './RoomSetting';
import { SelectionSettings } from './SelectionSettings';

export interface Settings {
  personSettings: PersonSetting[];
  daySettings: DaySetting[];
  /**
   * If no skills are specified all other skill properties will be ignored
   */
  skillSettings?: SkillSetting[];
  /**
   * This is enfoced during the auto generation of the Calendar
   */
  oneSpanPerDay: boolean;
  defaultSpan: SpanSetting;
  defaultRoom: RoomSetting;
  roomSettings?: RoomSetting[];

  /**
   * This is the Population size it defaults to 100
   */
  numberOfCalendars: number;

  selection: SelectionSettings;

  // I would perfer to use UUID but I want to ensure this project is as fast as possible so using integers
  /**
   * Integer counter for ids
   */
  idCounter: number;
}
