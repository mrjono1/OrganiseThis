import { PersonSetting, DaySetting, SpanSetting, SkillSetting } from '.';
import { RoomSetting } from './RoomSetting';

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
}
