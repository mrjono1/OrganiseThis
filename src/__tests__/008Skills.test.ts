import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySetting, PersonSetting, SkillSetting } from '../settings';
import { Weekday, SkillWeighting } from '../types';

const skillSettings: SkillSetting[] = [
  { id: 1, name: 'Open', weighting: SkillWeighting.Required },
  { id: 2, name: 'Close', weighting: SkillWeighting.Required }
];

const daySettings: DaySetting[] = [
  {
    id: 1,
    weekday: Weekday.Monday,
    spanSettings: [
      { id: 1, name: 'Open', skillSettingIds: [1] },
      { id: 2, name: 'Midday' },
      { id: 3, name: 'Afternoon' }
    ]
  },
  {
    id: 2,
    weekday: Weekday.Tuesday,
    spanSettings: [
      { id: 4, name: 'Open', skillSettingIds: [1] },
      { id: 5, name: 'Midday' },
      { id: 6, name: 'Afternoon' }
    ]
  },
  {
    id: 3,
    weekday: Weekday.Wednesday,
    spanSettings: [
      { id: 7, name: 'Open', skillSettingIds: [1] },
      { id: 8, name: 'Midday' },
      { id: 9, name: 'Afternoon' }
    ]
  },
  {
    id: 4,
    weekday: Weekday.Thursday,
    spanSettings: [
      { id: 10, name: 'Open', skillSettingIds: [1] },
      { id: 11, name: 'Midday' },
      { id: 12, name: 'Afternoon' }
    ]
  },
  {
    id: 5,
    weekday: Weekday.Friday,
    spanSettings: [
      { id: 13, name: 'Open', skillSettingIds: [1] },
      { id: 14, name: 'Midday' },
      { id: 15, name: 'Afternoon' }
    ]
  }
];

const personSettings: PersonSetting[] = [
  { id: 1, name: 'Steve', skillSettingIds: [1] },
  { id: 2, name: 'Bob', unavailableShiftIds: [2, 5] },
  { id: 3, name: 'Jen' },
  { id: 4, name: 'Simon', availability: { maxNumberOfSpans: 1 } },
  { id: 5, name: 'Greg' }
];

const settings: Partial<Settings> = { skillSettings, daySettings, personSettings };
const organiseThis = new OrganiseThis('Basic', settings);

test('008Skills', () => {
  organiseThis.run();

  // People can only have one shift each
  expect(organiseThis.bestCalendar).toBeDefined();

  if (!organiseThis.bestCalendar) {
    return;
  }

  console.log(`Iterations: ${organiseThis.iterations}`);
  console.log(organiseThis.bestCalendar.toString());
  expect(organiseThis.bestCalendar.fitness).toBe(1);
});
