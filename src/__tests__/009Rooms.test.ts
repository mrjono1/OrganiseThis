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
        spanSettings: [
          { id: 4, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 5, name: 'Midday' },
          { id: 6, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      }
    ]
  },
  {
    id: 2,
    weekday: Weekday.Tuesday,
    dayRoomSettings: [
      {
        id: 3,
        roomSettingId: ROOM_KITCHEN,
        spanSettings: [
          { id: 7, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 8, name: 'Midday' },
          { id: 9, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      },
      {
        id: 4,
        roomSettingId: ROOM_DINING_ROOM,
        spanSettings: [
          { id: 10, name: 'Open' },
          { id: 11, name: 'Midday' },
          { id: 12, name: 'Close', skillSettingIds: [] }
        ]
      }
    ]
  },
  {
    id: 3,
    weekday: Weekday.Wednesday,
    dayRoomSettings: [
      {
        id: 5,
        roomSettingId: ROOM_KITCHEN,
        spanSettings: [
          { id: 13, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 14, name: 'Midday' },
          { id: 15, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      },
      {
        id: 6,
        roomSettingId: ROOM_DINING_ROOM,
        spanSettings: [
          { id: 16, name: 'Open' },
          { id: 17, name: 'Midday' },
          { id: 18, name: 'Close', skillSettingIds: [] }
        ]
      }
    ]
  },
  {
    id: 4,
    weekday: Weekday.Thursday,
    dayRoomSettings: [
      {
        id: 7,
        roomSettingId: ROOM_KITCHEN,
        spanSettings: [
          { id: 19, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 20, name: 'Midday' },
          { id: 21, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      },
      {
        id: 8,
        roomSettingId: ROOM_DINING_ROOM,
        spanSettings: [
          { id: 22, name: 'Open' },
          { id: 23, name: 'Midday' },
          { id: 24, name: 'Close', skillSettingIds: [] }
        ]
      }
    ]
  },
  {
    id: 5,
    weekday: Weekday.Friday,
    dayRoomSettings: [
      {
        id: 9,
        roomSettingId: ROOM_KITCHEN,
        spanSettings: [
          { id: 25, name: 'Open', skillSettingIds: [SKILL_OPEN_KITCHEN] },
          { id: 26, name: 'Midday' },
          { id: 27, name: 'Close', skillSettingIds: [SKILL_CLOSE_KITCHEN] }
        ]
      },
      {
        id: 10,
        roomSettingId: ROOM_DINING_ROOM,
        spanSettings: [
          { id: 28, name: 'Open' },
          { id: 29, name: 'Midday' },
          { id: 30, name: 'Close', skillSettingIds: [] }
        ]
      }
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
