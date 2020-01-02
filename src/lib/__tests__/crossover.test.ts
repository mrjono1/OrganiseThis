import { DaySetting, PersonSetting, Availability } from '../../settings';
import { Weekday } from '../../types';
import { crossover } from '../Crossover';
import { Calendar } from '../Calendar';
import { DefaultSettings } from '../../defaults';
import { transform } from '../TransformSettings';

const availability: Availability = { maxNumberOfSpans: 1 };

const peopleSettings: PersonSetting[] = [
  { id: 1, name: 'Steve', availability },
  { id: 2, name: 'Bob', availability },
  { id: 3, name: 'Jen', availability },
  { id: 4, name: 'Simon', availability },
  { id: 5, name: 'Greg', availability }
];

const daySettings: DaySetting[] = [
  { id: 1, weekday: Weekday.Monday },
  { id: 2, weekday: Weekday.Tuesday },
  { id: 3, weekday: Weekday.Wednesday },
  { id: 4, weekday: Weekday.Thursday },
  { id: 5, weekday: Weekday.Friday }
];

const settings = transform({
  ...DefaultSettings,
  ...{ daySettings, personSettings: peopleSettings }
});

const calendars: Calendar[] = [new Calendar(1, settings), new Calendar(2, settings)];

test('Crossover', () => {
  const result = crossover(settings, calendars);

  // as there is only 2 calendars then these values should be swapped
  const calendaryOneDayIds = calendars[0].days.map(day => day.id);
  const calendaryTwoDayIds = calendars[1].days.map(day => day.id);

  const resultCalendaryOneDayIds = result[0].days.map(day => day.id);
  const resultCalendaryTwoDayIds = result[1].days.map(day => day.id);

  // has something changed
  expect(resultCalendaryOneDayIds).not.toStrictEqual(calendaryOneDayIds);
  expect(resultCalendaryTwoDayIds).not.toStrictEqual(calendaryTwoDayIds);

  // Has a straight swap occured (is the order the same)
  expect([calendaryOneDayIds[0], calendaryTwoDayIds[0]]).toContain(resultCalendaryOneDayIds[0]);
  expect([calendaryOneDayIds[0], calendaryTwoDayIds[0]]).toContain(resultCalendaryTwoDayIds[0]);

  expect([calendaryOneDayIds[4], calendaryTwoDayIds[4]]).toContain(resultCalendaryOneDayIds[4]);
  expect([calendaryOneDayIds[4], calendaryTwoDayIds[4]]).toContain(resultCalendaryTwoDayIds[4]);
});
