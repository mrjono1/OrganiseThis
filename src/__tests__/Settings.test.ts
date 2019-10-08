import OrganiseThis from '../lib/OrganiseThis';
import { SpanSetting, PersonSetting } from '../settings/';
import { Settings } from '../settings/Settings';

const settings = new Settings();

const steve = new PersonSetting(1, 'Steve');
const bob = new PersonSetting(2, 'Bob');

settings.people.push(steve);
settings.people.push(bob);

const basic = new OrganiseThis('Settings', settings);

test('Settings', () => {
  expect(basic.name).toBe('Settings');

  expect(steve.name).toBe('Steve');
  expect(bob.name).toBe('Bob');
});
