import OrganiseThis from '../lib/OrganiseThis';
import { DaySetting, PersonSetting } from '../settings';
import { Settings } from '../settings/Settings';
import { Weekday } from '../types';

const peopleSettings: PersonSetting[] = [{ id: 1, name: 'Steve' }, { id: 2, name: 'Bob' }];

const daySettings: DaySetting[] = [
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
});
