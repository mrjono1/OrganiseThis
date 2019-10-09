import OrganiseThis from '../lib/OrganiseThis';
import { SpanSetting, PersonSetting, Availability } from '../settings';
import { Settings } from '../settings/Settings';

const settings = new Settings();

const availability = new Availability();
availability.maxNumberOfSpans = 1;

settings.people.push(new PersonSetting(1, 'Steve', availability));
settings.people.push(new PersonSetting(2, 'Bob', availability));
settings.people.push(new PersonSetting(3, 'Jen', availability));
settings.people.push(new PersonSetting(4, 'Simon', availability));
settings.people.push(new PersonSetting(5, 'Greg', availability));

settings.spans.push(new SpanSetting(1, new Date(2019, 1, 1)));
settings.spans.push(new SpanSetting(2, new Date(2019, 1, 2)));
settings.spans.push(new SpanSetting(3, new Date(2019, 1, 3)));
settings.spans.push(new SpanSetting(4, new Date(2019, 1, 4)));
settings.spans.push(new SpanSetting(5, new Date(2019, 1, 5)));

const basic = new OrganiseThis('Basic', settings);

test('OneSpanEach', () => {
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
