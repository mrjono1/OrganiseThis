import { Span } from './Span';
import { Settings, DaySetting, PersonSetting } from '../settings';
import { randomIndexAndItem } from '../helpers/random';
import { Weekday } from '../types';
import { Room } from './Room';

export class Day {
  public readonly id: number;
  public readonly settings: Settings;
  public readonly daySetting: DaySetting;
  public readonly rooms: Room[];

  private _fitness?: number;

  constructor(id: number, settings: Settings, daySetting: DaySetting) {
    this.id = id;
    this.settings = settings;
    this.daySetting = daySetting;
    this.rooms = [];
    this.newDay();
  }

  newDay(): void {
    const personIndexesUsed: number[] = [];

    if (!this.daySetting.dayRoomSettings) {
      return;
    }

    for (const dayRoomSetting of this.daySetting.dayRoomSettings) {
      const room = new Room(this.settings.idCounter++, this.settings, dayRoomSetting);
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
            this.settings.skillSettings &&
            this.settings.skillSettings.length !== 0
          ) {
            for (let index = 0; index < this.settings.personSettings.length; index++) {
              if (usedIndexes.includes(index)) {
                continue;
              }
              let matched = false;
              const personSetting = this.settings.personSettings[index];
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

          const { index, item } = randomIndexAndItem(this.settings.personSettings, usedIndexes);
          personSettingItem = item;
          personSettingIndex = index;
        }

        const span = new Span(this.settings.idCounter++, this.settings, spanSetting, personSettingItem);
        room.spans.push(span);

        if (personSettingIndex !== undefined) {
          personIndexesUsed.push(personSettingIndex);
        }
      }

      this.rooms.push(room);
    }
  }

  private fixedPerson(spanSettingId: number): { fixedPersonIndex?: number; fixedPersonItem?: PersonSetting } {
    for (let index = 0; index < this.settings.personSettings.length; index++) {
      const personSetting = this.settings.personSettings[index];
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
    for (let index = 0; index < this.settings.personSettings.length; index++) {
      const personSetting = this.settings.personSettings[index];
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

    return this._fitness ?? 0;
  }

  public toString(): string {
    const roomsToString: string[] = [];

    for (const room of this.rooms) {
      roomsToString.push(room.toString());
    }

    const name = this.daySetting.weekday ? Weekday[this.daySetting.weekday].toString() : '';
    return `Day Id: ${this.id}, Setting Id: ${this.daySetting.id}, ${name}
  Day Fitness: ${this._fitness}
  Rooms:
${roomsToString.join('\n')}`;
  }
}
