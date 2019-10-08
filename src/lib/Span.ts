﻿import { Settings } from '../settings/Settings';
import { PersonSetting, SpanSetting } from '../settings';
import { Person } from './Person';

export class Span {
  private _id: number;
  private _settings: Settings;
  private _spanSettings: SpanSetting;

  private _personSettings?: PersonSetting;

  private _person?: Person;

  private _fitness?: number;

  constructor(id: number, settings: Settings, spanSettings: SpanSetting) {
    this._id = id;
    this._settings = settings;
    this._spanSettings = spanSettings;
    this.newSpan();
  }

  private newSpan() {
    // todo in future span settings will influence this section

    // random person

    const position = Math.floor(Math.random() * (this._settings.people.length + 1));
    const person = this._settings.people[position];
    this._person = new Person(0, this._settings, person);
  }

  get id(): number {
    return this._id;
  }
  get fitness(): number {
    // todo in future span settings will influence this section
    if (!this._fitness) {
      this.evaluate();
    }

    return this._fitness || 0;
  }
  evaluate(): void {
    if (!this._person) {
      // if there is no person set then there is nothing wrong
      this._fitness = 1;
    }

    this._fitness = 0;
  }
  public copy(): Span {
    const copy = JSON.parse(JSON.stringify(this)) as Span;
    return copy;
  }

  public toString(): string {
    const peopleToString: string[] = [];
    if (this._person) {
      peopleToString.push(this._person.toString());
    }
    return `Span Id: ${this._id}
  Span Evaluated: ${this._fitness ? 'Yes' : 'No'}
  Span Fitness: ${this._fitness}
  People:
${peopleToString.join('\n')}`;
  }
}