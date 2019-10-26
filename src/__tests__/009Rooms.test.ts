import OrganiseThis from '../lib/OrganiseThis';
import { Settings, DaySetting, PersonSetting, SkillSetting, RoomSetting } from '../settings';
import { Weekday } from '../types';

const [SKILL_DINING_ROOM, SKILL_KITCHEN, SKILL_OPEN_KITCHEN, SKILL_CLOSE_KITCHEN] = [1, 2, 3, 4];

const skillSettings: SkillSetting[] = [
  { id: SKILL_DINING_ROOM, name: 'Front of house', description: 'Can work out the front waiting on customers' },
  { id: SKILL_KITCHEN, name: 'Back of house', description: 'Can work in the kitchen' },
  { id: SKILL_OPEN_KITCHEN, name: 'Open Kitchen' },
  { id: SKILL_CLOSE_KITCHEN, name: 'Close Kitchen' }
];

const [ROOM_KITCHEN, ROOM_DINING_ROOM] = [1, 2];
const roomSettings: RoomSetting[] = [
  { id: 1, name: 'Kitchen', skillSettingIds: [SKILL_KITCHEN] },
  { id: 2, name: 'Dining room', skillSettingIds: [SKILL_DINING_ROOM] }
];

const daySettings: DaySetting[] = [
  {
    id: 1,
    weekday: Weekday.Monday,
    dayRoomSettings: [
      {
        id: 1,
        roomSettingId: ROOM_KITCHEN,
        spanSettings: [
          { id: 1, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 2, name: 'Midday' },
          { id: 3, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      },
      {
        id: 2,
        roomSettingId: ROOM_DINING_ROOM,
        spanSettings: [{ id: 3, name: 'Open' }, { id: 4, name: 'Midday' }, { id: 5, name: 'Close' }]
      }
    ]
  },
  {
    id: 2,
    weekday: Weekday.Tuesday,
    spanSettings: [{ id: 4, name: 'Open', skillSettingIds: [1] }, { id: 5, name: 'Midday' }, { id: 6, name: 'Close' }]
  },
  {
    id: 3,
    weekday: Weekday.Wednesday,
    spanSettings: [{ id: 7, name: 'Open', skillSettingIds: [1] }, { id: 8, name: 'Midday' }, { id: 9, name: 'Close' }]
  },
  {
    id: 4,
    weekday: Weekday.Thursday,
    spanSettings: [
      { id: 10, name: 'Open', skillSettingIds: [1] },
      { id: 11, name: 'Midday' },
      { id: 12, name: 'Close' }
    ]
  },
  {
    id: 5,
    weekday: Weekday.Friday,
    spanSettings: [
      { id: 13, name: 'Open', skillSettingIds: [1] },
      { id: 14, name: 'Midday' },
      { id: 15, name: 'Close' }
    ]
  }
];

const personSettings: PersonSetting[] = [
  { id: 1, name: 'Steve', skillSettingIds: [SKILL_KITCHEN, SKILL_OPEN_KITCHEN] },
  { id: 2, name: 'Bob', unavailableShiftIds: [2, 5] },
  { id: 3, name: 'Jen' },
  { id: 4, name: 'Simon', availability: { maxNumberOfSpans: 1 } },
  { id: 5, name: 'Greg' }
];

const settings: Partial<Settings> = { skillSettings, daySettings, personSettings, roomSettings };
const organiseThis = new OrganiseThis('Cafe', settings);

test('009Rooms', () => {
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
