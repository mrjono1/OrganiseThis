import { Span } from './Span';
import { Settings, DaySetting, PersonSetting } from '../settings';
import { randomIndexAndItem } from '../helpers/random';
import { Weekday } from '../types';

export class Day {
  private _id: number;
  private _settings: Settings;
  private _daySetting: DaySetting;

  private _spans: Span[];

  private _fitness?: number;

  constructor(id: number, settings: Settings, daySetting: DaySetting) {
    this._id = id;
    this._settings = settings;
    this._daySetting = daySetting;
    this._spans = [];
    this.newDay();
  }

  newDay(): void {
    // Default span if none defined
    if (!this._daySetting.spanSettings) {
      this._spans.push(new Span(0, this._settings, { id: 0 }));
      return;
    }

    let spanId = 1;
    const personIndexesUsed: number[] = [];
    for (const spanSetting of this._daySetting.spanSettings) {
      let personSettingItem: PersonSetting | undefined = undefined;
      let personSettingIndex: number | undefined = undefined;

      const { fixedPersonIndex, fixedPersonItem } = this.fixedPerson(spanSetting.id);
      personSettingItem = fixedPersonItem;
      personSettingIndex = fixedPersonIndex;

      if (personSettingItem === undefined && this._settings.oneSpanPerDay) {
        const { index, item } = randomIndexAndItem(this._settings.personSettings, personIndexesUsed);
        personSettingItem = item;
        personSettingIndex = index;
      }

      const span = new Span(spanId++, this._settings, spanSetting, personSettingItem);
      this._spans.push(span);

      if (personSettingIndex) {
        personIndexesUsed.push(personSettingIndex);
      }
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

  get id(): number {
    return this._id;
  }

  public copy(): Day {
    const copy = JSON.parse(JSON.stringify(this)) as Day;
    return copy;
  }

  evaluate(): void {
    if (!this._spans || this._spans.length === 0) {
      // if there is no span set then there is nothing wrong
      this._fitness = 1;
      return;
    }

    let dayFitness = 0;
    for (const span of this._spans) {
      dayFitness += span.fitness;
    }
    this._fitness = dayFitness / this._spans.length;
  }

  get fitness(): number {
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  get spans(): Span[] {
    return this._spans;
  }

  public toString(): string {
    const spansToString: string[] = [];

    if (this._spans) {
      for (const span of this._spans) {
        spansToString.push(span.toString());
      }
    }

    const name = this._daySetting.weekday ? Weekday[this._daySetting.weekday].toString() : '';
    return `Day Id: ${this._id}, Setting Id: ${this._daySetting.id}, ${name}
  Day Fitness: ${this._fitness}
  Spans:
${spansToString.join('\n')}`;
  }
}
