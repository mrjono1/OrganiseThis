import { Settings } from '../settings/Settings';
import { PersonSetting, SpanSetting } from '../settings';

export class Person {
  private _id: number;
  private _settings: Settings;

  private _personSettings?: PersonSetting;

  private _fitness?: number;

  constructor(id: number, settings: Settings, personSettings: PersonSetting) {
    this._id = id;
    this._settings = settings;
    this._personSettings = personSettings;
    this.newPerson();
  }

  private newPerson() {
    // todo in future person settings will influence this section
  }

  get id(): number {
    return this._id;
  }
  get fitness(): number {
    // todo in future person settings will influence this section
    if (!this._fitness) {
      this.evaluate();
    }

    return this._fitness || 0;
  }
  evaluate(): void {
    this._fitness = 1;
  }
  public copy(): Person {
    const copy = JSON.parse(JSON.stringify(this)) as Person;
    return copy;
  }

  public toString(): string {
    return `Person Id: ${this._id}
    Person Evaluated: ${this._fitness ? 'Yes' : 'No'}
    Person Fitness: ${this._fitness}`;
  }
}
