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
  numberOfGenerations: 10,
  numberOfCalendars: 100,
  selection: {
    bestCalendarsToKeep: 20
  },
  mutation: {
    maxNumberItemsToMutate: 20
  },
  idCounter: 1
};
