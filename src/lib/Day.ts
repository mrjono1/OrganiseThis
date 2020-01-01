import { Span } from './Span';
import { Settings, DaySetting, PersonSetting } from '../settings';
import { randomIndexAndItem } from '../helpers/random';
import { Weekday } from '../types';
import { Room } from './Room';

export class Day {
  private _id: number;

  private _settings: Settings;

  private _daySetting: DaySetting;
  private _rooms: Room[];
  private _fitness?: number;

  constructor(id: number, settings: Settings, daySetting: DaySetting) {
    this._id = id;
    this._settings = settings;
    this._daySetting = daySetting;
    this._rooms = [];
    this.newDay();
  }

  newDay(): void {
    let spanId = 1;
    let roomId = 1;
    const personIndexesUsed: number[] = [];

    if (!this._daySetting.dayRoomSettings) {
      return;
    }

    for (const dayRoomSetting of this._daySetting.dayRoomSettings) {
      const room = new Room(roomId++, this._settings, dayRoomSetting);
      for (const spanSetting of dayRoomSetting.spanSettings) {
        let personSettingItem: PersonSetting | undefined = undefined;
        let personSettingIndex: number | undefined = undefined;

        const { fixedPersonIndex, fixedPersonItem } = this.fixedPerson(spanSetting.id);
        personSettingItem = fixedPersonItem;
        personSettingIndex = fixedPersonIndex;

        if (personSettingItem === undefined) {
          // todo ensure unique list
          const usedIndexes = this.getUnavailablePersonIndexes(spanSetting.id).concat(personIndexesUsed);

          // Filter out people who dont have the skill
          if (
            spanSetting.skillSettingIds &&
            spanSetting.skillSettingIds.length !== 0 &&
            this._settings.skillSettings &&
            this._settings.skillSettings.length !== 0
          ) {
            for (let index = 0; index < this._settings.personSettings.length; index++) {
              if (usedIndexes.includes(index)) {
                continue;
              }
              let matched = false;
              const personSetting = this._settings.personSettings[index];
              if (personSetting.skillSettingIds && personSetting.skillSettingIds.length !== 0) {
                let matchedSkillCount = 0;
                for (const spanSkillId of spanSetting.skillSettingIds) {
                  if (personSetting.skillSettingIds.includes(spanSkillId)) {
                    matchedSkillCount++;
                  }
                }
                matched = matchedSkillCount === spanSetting.skillSettingIds.length;
              }
              if (!matched) {
                usedIndexes.push(index);
              }
            }
          }

          const { index, item } = randomIndexAndItem(this._settings.personSettings, usedIndexes);
          personSettingItem = item;
          personSettingIndex = index;
        }

        const span = new Span(spanId++, this._settings, spanSetting, personSettingItem);
        room.spans.push(span);

        if (personSettingIndex !== undefined) {
          personIndexesUsed.push(personSettingIndex);
        }
      }

      this.rooms.push(room);
    }
  }

  private fixedPerson(spanSettingId: number): { fixedPersonIndex?: number; fixedPersonItem?: PersonSetting } {
    for (let index = 0; index < this._settings.personSettings.length; index++) {
      const personSetting = this._settings.personSettings[index];
      if (!personSetting.fixedShiftsIds) {
        continue;
      }
      const matched = personSetting.fixedShiftsIds.find((id: number) => id === spanSettingId);
      if (matched) {
        return { fixedPersonIndex: index, fixedPersonItem: personSetting };
      }
    }
    return { fixedPersonIndex: undefined, fixedPersonItem: undefined };
  }

  private getUnavailablePersonIndexes(spanSettingId: number): number[] {
    const indexes: number[] = [];
    for (let index = 0; index < this._settings.personSettings.length; index++) {
      const personSetting = this._settings.personSettings[index];
      if (!personSetting.unavailableShiftIds || personSetting.unavailableShiftIds.length === 0) {
        continue;
      }
      for (const id of personSetting.unavailableShiftIds) {
        if (id === spanSettingId) {
          indexes.push(id);
        }
      }
    }
    return indexes;
  }

  get id(): number {
    return this._id;
  }

  public copy(): Day {
    const copy = JSON.parse(JSON.stringify(this)) as Day;
    return copy;
  }

  evaluate(): void {
    let fitness = 0;

    for (const room of this.rooms) {
      fitness += room.fitness;
    }

    this._fitness = this.rooms.length === 0 ? 0 : fitness / this.rooms.length;
  }

  get fitness(): number {
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  get rooms(): Room[] {
    return this._rooms;
  }

  public toString(): string {
    const roomsToString: string[] = [];

    for (const room of this.rooms) {
      roomsToString.push(room.toString());
    }

    const name = this._daySetting.weekday ? Weekday[this._daySetting.weekday].toString() : '';
    return `Day Id: ${this._id}, Setting Id: ${this._daySetting.id}, ${name}
  Day Fitness: ${this._fitness}
  Rooms:
${roomsToString.join('\n')}`;
  }
}
