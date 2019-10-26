import { Weekday } from '../types';
import { SpanSetting } from '.';
import { DayRoomSetting } from './DayRoomSettings';

export interface DaySetting {
  id: number;
  weekday?: Weekday;
  /**
   * This is only used if there is one room otherwise use dayRoomSettings
   */
  spanSettings?: SpanSetting[];
  dayRoomSettings?: DayRoomSetting[];
}
