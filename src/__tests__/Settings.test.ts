import OrganiseThis from '../lib/OrganiseThis';
import { SpanSetting, PersonSetting } from '../settings/';
import { Settings } from '../settings/Settings';

const people: PersonSetting[] = [{ id: 1, name: 'Steve' }, { id: 2, name: 'Bob' }];

const spans: SpanSetting[] = [
  { id: 1, date: new Date(2019, 1, 1) },
  { id: 2, date: new Date(2019, 1, 2) },
  { id: 3, date: new Date(2019, 1, 3) }
];

const settings: Settings = { spans, people };

const basic = new OrganiseThis('Settings', settings);

test('Settings', () => {
  expect(basic.name).toBe('Settings');

  expect(basic.setting.people[0].name).toBe('Steve');
  expect(basic.setting.people[1].name).toBe('Bob');

  expect(basic.setting.spans[0].date).toStrictEqual(new Date(2019, 1, 1));
  expect(basic.setting.spans[1].date).toStrictEqual(new Date(2019, 1, 2));
  expect(basic.setting.spans[2].date).toStrictEqual(new Date(2019, 1, 3));
});
