﻿import { Settings, PersonSetting } from '../settings';

export class Person {
  private _id: number;
  private _settings: Settings;
  private _personSetting: PersonSetting;
  private _fitness?: number;

  constructor(id: number, settings: Settings, personSetting: PersonSetting) {
    this._id = id;
    this._settings = settings;
    this._personSetting = personSetting;
    this.newPerson();
  }

  private newPerson(): void {
    // todo in future person settings will influence this section
  }

  get id(): number {
    return this._id;
  }

  get fitness(): number {
    // todo in future person settings will influence this section
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  get settings(): PersonSetting {
    return this._personSetting;
  }

  evaluate(): void {
    this._fitness = 1;
  }

  public copy(): Person {
    const copy = JSON.parse(JSON.stringify(this)) as Person;
    return copy;
  }

  public toString(): string {
    return `      Person Id: ${this._id}, Setting Id: ${this._personSetting.id}, ${this._personSetting.name}
      Person Fitness: ${this._fitness}`;
  }
}
