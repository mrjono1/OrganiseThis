import { Weekday } from '../types';
import { SpanSetting } from '.';

export interface DaySettings {
  id: number;
  weekday?: Weekday;
  spans?: SpanSetting[];
}
