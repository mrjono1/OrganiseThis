import OrganiseThis from '../lib/OrganiseThis';
import { SpanSetting, PersonSetting } from '../settings/';
import { Settings } from '../settings/Settings';

const settings = new Settings();

const steve = new PersonSetting(1, 'Steve');
const bob = new PersonSetting(2, 'Bob');

settings.people.push(steve);
settings.people.push(bob);

const shift1 = new SpanSetting(1, new Date(2019, 1, 1));
const shift2 = new SpanSetting(2, new Date(2019, 1, 2));
const shift3 = new SpanSetting(3, new Date(2019, 1, 3));

settings.spans.push(shift1);
settings.spans.push(shift2);
settings.spans.push(shift3);

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
