import OrganiseThis from '../lib/OrganiseThis';
import { DaySetting, PersonSetting, Settings } from '../settings';
import { Weekday } from '../types';

const peopleSettings: PersonSetting[] = [
  { id: 1, name: 'Steve' },
  { id: 2, name: 'Bob' }
];

const daySettings: DaySetting[] = [
  { id: 1, weekday: Weekday.Monday },
  { id: 2, weekday: Weekday.Tuesday },
  { id: 3, weekday: Weekday.Wednesday }
];

test('Settings', () => {
  const settings: Partial<Settings> = { daySettings, personSettings: peopleSettings };
  const basic = new OrganiseThis('Settings', settings);
  expect(basic.name).toBe('Settings');

  expect(basic.settings.personSettings[0].name).toBe('Steve');
  expect(basic.settings.personSettings[1].name).toBe('Bob');

  expect(basic.settings.daySettings[0].weekday).toBe(Weekday.Monday);
  expect(basic.settings.daySettings[1].weekday).toBe(Weekday.Tuesday);
  expect(basic.settings.daySettings[2].weekday).toBe(Weekday.Wednesday);

  const invalidSettings: Partial<Settings> = {
    daySettings,
    personSettings: peopleSettings,
    selection: { numberOfCalendars: 200, enabled: true }
  };

  expect(() => new OrganiseThis('Settings', invalidSettings)).toThrowError();
});
