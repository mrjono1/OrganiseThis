import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySettings, PersonSettings } from '../settings';
import { Weekday } from '../types';

const peopleSettings: PersonSettings[] = [{ id: 1, name: 'Steve' }, { id: 2, name: 'Bob' }];

const daySettings: DaySettings[] = [
  { id: 1, weekday: Weekday.Monday },
  { id: 2, weekday: Weekday.Tuesday },
  { id: 3, weekday: Weekday.Wednesday }
];

const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };

const basic = new OrganiseThis('Basic', settings);

test('Basic', () => {
  basic.run();

  // This has no restrictions, just that each shift must be filled

  expect(basic.iterations).toBe(1);
  expect(basic.bestCalendar).toBeDefined();
  if (!basic.bestCalendar) {
    return;
  }
  expect(basic.bestCalendar.fitness).toBe(1);

  expect(basic.toString()).not.toContain('[object Object]');
});
