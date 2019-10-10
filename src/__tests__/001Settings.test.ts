import OrganiseThis from '../lib/OrganiseThis';
import { DaySetting, PersonSetting, Settings } from '../settings';
import { Weekday } from '../types';

const peopleSettings: PersonSetting[] = [{ id: 1, name: 'Steve' }, { id: 2, name: 'Bob' }];

const daySettings: DaySetting[] = [
  { id: 1, weekday: Weekday.Monday },
  { id: 2, weekday: Weekday.Tuesday },
  { id: 3, weekday: Weekday.Wednesday }
];

const settings: Settings = { daySettings, personSettings: peopleSettings };

const basic = new OrganiseThis('Settings', settings);

test('Settings', () => {
  expect(basic.name).toBe('Settings');

  expect(basic.setting.personSettings[0].name).toBe('Steve');
  expect(basic.setting.personSettings[1].name).toBe('Bob');

  expect(basic.setting.daySettings[0].weekday).toBe(Weekday.Monday);
  expect(basic.setting.daySettings[1].weekday).toBe(Weekday.Tuesday);
  expect(basic.setting.daySettings[2].weekday).toBe(Weekday.Wednesday);
});
