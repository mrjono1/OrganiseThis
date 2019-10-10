import OrganiseThis from '../lib/OrganiseThis';
import { DaySetting, PersonSetting } from '../settings';
import { Settings } from '../settings/Settings';
import { Weekday } from '../types';

const peopleSettings: PersonSetting[] = [{ id: 1, name: 'Steve' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Jen' }];

let spanId = 1;
const daySettings: DaySetting[] = [
  {
    id: 1,
    weekday: Weekday.Monday,
    spanSettings: [
      { id: spanId++, name: 'Early' },
      { id: spanId++, name: 'Midday' },
      { id: spanId++, name: 'Afternoon' }
    ]
  },
  {
    id: 2,
    weekday: Weekday.Tuesday,
    spanSettings: [
      { id: spanId++, name: 'Early' },
      { id: spanId++, name: 'Midday' },
      { id: spanId++, name: 'Afternoon' }
    ]
  },
  {
    id: 3,
    weekday: Weekday.Wednesday,
    spanSettings: [
      { id: spanId++, name: 'Early' },
      { id: spanId++, name: 'Midday' },
      { id: spanId++, name: 'Afternoon' }
    ]
  },
  {
    id: 4,
    weekday: Weekday.Thursday,
    spanSettings: [
      { id: spanId++, name: 'Early' },
      { id: spanId++, name: 'Midday' },
      { id: spanId++, name: 'Afternoon' }
    ]
  },
  {
    id: 5,
    weekday: Weekday.Friday,
    spanSettings: [
      { id: spanId++, name: 'Early' },
      { id: spanId++, name: 'Midday' },
      { id: spanId++, name: 'Afternoon' }
    ]
  }
];

const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };
const organiseThis = new OrganiseThis('Basic', settings);

test('005ThreeShiftsPerDay', () => {
  organiseThis.run();
  // spans[0].date
  // People can only have one shift each

  expect(organiseThis.bestCalendar).toBeDefined();

  if (!organiseThis.bestCalendar) {
    return;
  }

  console.log(`Iterations: ${organiseThis.iterations}`);
  console.log(organiseThis.bestCalendar.toString());
  expect(organiseThis.bestCalendar.fitness).toBe(1);
});
