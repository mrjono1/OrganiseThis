import {
  PersonSetting,
  DaySetting,
  SpanSetting,
  SkillSetting,
  MutationSettings,
  CrossoverSettings,
  RoomSetting,
  SelectionSettings
} from '.';

export interface Settings {
  personSettings: PersonSetting[];
  daySettings: DaySetting[];
  /**
   * If no skills are specified all other skill properties will be ignored
   * Using Partial<SkillSetting> will default `weighting` if not already set
   */
  skillSettings?: SkillSetting[] | Partial<SkillSetting>[];
  /**
   * This is enfoced during the auto generation of the Calendar
   */
  oneSpanPerDay: boolean;
  defaultSpan: SpanSetting;
  defaultRoom: RoomSetting;
  roomSettings?: RoomSetting[];

  /**
   * How many times do we try to make modifications to the calendars to attemt to get the best possible calendar
   * The `lower` number the faster but lower possibility of the best solution
   * The `higher` number the slower but the higher possibility of the best solution
   */
  numberOfGenerations: number;

  /**
   * This is the Population size it defaults to 100
   */
  numberOfCalendars: number;

  selection: SelectionSettings;
  crossover: CrossoverSettings;
  mutation: MutationSettings;

  // I would perfer to use UUID but I want to ensure this project is as fast as possible so using integers
  /**
   * Integer counter for ids, for internal use only
   */
  idCounter: number;
}
