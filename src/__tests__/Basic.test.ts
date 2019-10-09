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
