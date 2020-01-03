import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySetting, PersonSetting } from '../settings';
import { Weekday } from '../types';

const daySettings: DaySetting[] = [
  {
    id: 1,
    weekday: Weekday.Monday,
    spanSettings: [
      { id: 1, name: 'Open' },
      { id: 2, name: 'Midday' },
      { id: 3, name: 'Afternoon' }
    ]
  },
  {
    id: 2,
    weekday: Weekday.Tuesday,
    spanSettings: [
      { id: 4, name: 'Open' },
      { id: 5, name: 'Midday' },
      { id: 6, name: 'Afternoon' }
    ]
  },
  {
    id: 3,
    weekday: Weekday.Wednesday,
    spanSettings: [
      { id: 7, name: 'Open' },
      { id: 8, name: 'Midday' },
      { id: 9, name: 'Afternoon' }
    ]
  },
  {
    id: 4,
    weekday: Weekday.Thursday,
    spanSettings: [
      { id: 10, name: 'Open' },
      { id: 11, name: 'Midday' },
      { id: 12, name: 'Afternoon' }
    ]
  },
  {
    id: 5,
    weekday: Weekday.Friday,
    spanSettings: [
      { id: 13, name: 'Open' },
      { id: 14, name: 'Midday' },
      { id: 15, name: 'Afternoon' }
    ]
  }
];

const peopleSettings: PersonSetting[] = [
  { id: 1, name: 'Steve', fixedShiftsIds: [1, 4, 7, 10, 13] },
  { id: 2, name: 'Bob', unavailableShiftIds: [2, 5] },
  { id: 3, name: 'Jen' },
  { id: 4, name: 'Simon', availability: { maxNumberOfSpans: 1 } },
  { id: 5, name: 'Greg' }
];

const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };
const organiseThis = new OrganiseThis('Basic', settings);

test('007UnavailableShifts', () => {
  organiseThis.run();

  // People can only have one shift each
  expect(organiseThis.bestCalendar).toBeDefined();

  if (!organiseThis.bestCalendar) {
    return;
  }

  console.log(`Iterations: ${organiseThis.iterations}`);
  console.log(organiseThis.bestCalendar.toString());
  expect(organiseThis.bestCalendar.fitness).toBe(1);
});
