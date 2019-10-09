import OrganiseThis from '../lib/OrganiseThis';
import { SpanSetting, PersonSetting, Availability } from '../settings';
import { Settings } from '../settings/Settings';

//'https://stackoverflow.com/a/37682352/3308772';
const availability: Availability = { maxNumberOfSpans: 1 };

const people: PersonSetting[] = [
  { id: 1, name: 'Steve', availability: { maxNumberOfSpans: 1 } },
  { id: 2, name: 'Bob', availability: { maxNumberOfSpans: 2 } },
  { id: 3, name: 'Jen', availability: { maxNumberOfSpans: 5 } }
];

const spans: SpanSetting[] = [
  { id: 1, date: new Date(2019, 1, 1) },
  { id: 2, date: new Date(2019, 1, 2) },
  { id: 3, date: new Date(2019, 1, 3) },
  { id: 4, date: new Date(2019, 1, 4) },
  { id: 5, date: new Date(2019, 1, 5) }
];

const settings: Settings = { spans, people };
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
