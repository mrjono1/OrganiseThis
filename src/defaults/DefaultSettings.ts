import { Settings } from '../settings';

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
  numberOfCalendars: 100,
  selection: {
    bestCalendarsToKeep: 10
  },
  idCounter: 1
};
