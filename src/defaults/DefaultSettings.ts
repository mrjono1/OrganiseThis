import { Settings, SkillSetting } from '../settings';
import { SkillWeighting } from 'types';

export const DefaultSettings: Settings = {
  oneSpanPerDay: true,
  daySettings: [],
  personSettings: [],
  defaultSpan: {
    id: 0,
    name: 'All Day'
  },
  defaultRoom: {
    id: 0,
    name: 'Main Room'
  },
  numberOfGenerations: 10,
  numberOfCalendars: 100,
  selection: {
    numberOfCalendars: 20,
    enabled: true
  },
  crossover: {
    numberOfCalendars: 20,
    enabled: true
  },
  mutation: {
    numberOfCalendars: 20,
    enabled: false
  },
  idCounter: 1
};

export const DefaultSkillSetting: SkillSetting = {
  id: 0,
  name: 'Default',
  weighting: SkillWeighting.Required
};
