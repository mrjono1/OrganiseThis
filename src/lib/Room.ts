import { Settings, DayRoomSetting, PersonSetting, SpanSetting } from 'settings';
import { Span } from 'lib';
import { randomIndexAndItem } from 'helpers';

export class Room {
  public readonly id: number;
  public readonly settings: Settings;
  public readonly dayRoomSetting: DayRoomSetting;
  public readonly spans: Span[];

  private _fitness?: number;

  constructor(id: number, settings: Settings, dayRoomSetting: DayRoomSetting, personIndexesUsed?: number[]) {
    this.id = id;
    this.settings = settings;
    this.dayRoomSetting = dayRoomSetting;
    this.spans = [];
    this.newRoom(personIndexesUsed ?? []);
  }

  private newRoom(personIndexesUsed: number[]): void {
    // Create the Spans of the Room
    for (const spanSetting of this.dayRoomSetting.spanSettings) {
      const { index, item } = this.getPerson(spanSetting, personIndexesUsed);

      const span = new Span(this.settings.idCounter++, this.settings, spanSetting, item);
      this.spans.push(span);

      if (index !== undefined) {
        personIndexesUsed.push(index);
      }
    }
  }

  private getPerson(spanSetting: SpanSetting, personIndexesUsed: number[]): { item?: PersonSetting; index?: number } {
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

      if (this.settings.personSettings.length !== usedIndexes.length) {
        const { index, item } = randomIndexAndItem(this.settings.personSettings, usedIndexes);
        personSettingItem = item;
        personSettingIndex = index;
      }
    }

    return { index: personSettingIndex, item: personSettingItem };
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

  get fitness(): number {
    return this._fitness ?? NaN;
  }

  evaluate(): void {
    let fitness = 0;
    for (const span of this.spans) {
      span.evaluate();
      fitness += span.fitness;
    }
    this._fitness = this.spans.length === 0 ? 0 : fitness / this.spans.length;
  }

  public toString(): string {
    const toString: string[] = [];

    for (const span of this.spans) {
      toString.push(span.toString());
    }

    return `Room Id: ${this.id}, Setting Id: ${this.dayRoomSetting.id}, ${name}
  Room Fitness: ${this._fitness}
  Spans:
${toString.join('\n')}`;
  }
}
