import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySetting, PersonSetting, Availability } from '../settings';
import { Weekday } from '../types';

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

const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };
const basic = new OrganiseThis('Basic', settings);

test('OneSpanEach', () => {
  basic.run();

  // People can only have one shift each

  expect(basic.bestCalendar).toBeDefined();
  if (!basic.bestCalendar) {
    return;
  }
  expect(basic.bestCalendar.fitness).toBe(1);

  console.log(`Iterations: ${basic.iterations}`);
  console.log(basic.bestCalendar.toString());
});
