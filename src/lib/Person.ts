import { Settings, PersonSettings } from '../settings';

export class Person {
  private _id: number;
  private _settings: Settings;

  private _personSettings: PersonSettings;

  private _fitness?: number;

  constructor(id: number, settings: Settings, personSettings: PersonSettings) {
    this._id = id;
    this._settings = settings;
    this._personSettings = personSettings;
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

  get settings(): PersonSettings {
    return this._personSettings;
  }

  evaluate(): void {
    this._fitness = 1;
  }
  public copy(): Person {
    const copy = JSON.parse(JSON.stringify(this)) as Person;
    return copy;
  }

  public toString(): string {
    return `      Person Id: ${this._id}, Setting Id: ${this._personSettings.id}, ${this._personSettings.name}
      Person Fitness: ${this._fitness}`;
  }
}
