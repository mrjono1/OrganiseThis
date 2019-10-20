import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySettings, PersonSettings } from '../settings';
import { Weekday } from '../types';

// 'https://stackoverflow.com/a/37682352/3308772';

const peopleSettings: PersonSettings[] = [
  { id: 1, name: 'Steve', availability: { maxNumberOfSpans: 1 } },
  { id: 2, name: 'Bob', availability: { maxNumberOfSpans: 2 } },
  { id: 3, name: 'Jen', availability: { maxNumberOfSpans: 5 } }
];

const daySettings: DaySettings[] = [
  { id: 1, weekday: Weekday.Monday },
  { id: 2, weekday: Weekday.Tuesday },
  { id: 3, weekday: Weekday.Wednesday },
  { id: 4, weekday: Weekday.Thursday },
  { id: 5, weekday: Weekday.Friday }
];

const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };
const basic = new OrganiseThis('Basic', settings);

test('VaryingMaxSpanEach', () => {
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
