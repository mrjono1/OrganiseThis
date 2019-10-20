import { Weekday } from '../types';
import { SpanSettings } from '.';

export interface DaySettings {
  id: number;
  weekday?: Weekday;
  spanSettings?: SpanSettings[];
}
