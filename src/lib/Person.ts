import { Settings, PersonSetting } from 'settings';

export class Person {
  public readonly id: number;
  public readonly settings: Settings;
  public readonly personSetting: PersonSetting;

  private _fitness?: number;

  constructor(id: number, settings: Settings, personSetting: PersonSetting) {
    this.id = id;
    this.settings = settings;
    this.personSetting = personSetting;
    this.newPerson();
  }

  private newPerson(): void {
    // todo in future person settings will influence this section
  }

  get fitness(): number {
    // todo in future person settings will influence this section
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness ?? 0;
  }

  evaluate(): void {
    this._fitness = 1;
  }

  public toString(): string {
    return `      Person Id: ${this.id}, Setting Id: ${this.personSetting.id}, ${this.personSetting.name}
      Person Fitness: ${this._fitness}`;
  }
}
