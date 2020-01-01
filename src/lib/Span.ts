import { Settings, PersonSetting, SpanSetting } from '../settings';
import { Person } from './Person';

export class Span {
  public readonly id: number;
  private _settings: Settings;
  private _spanSetting: SpanSetting;
  private _personSetting?: PersonSetting;
  private _person?: Person;
  private _fitness?: number;

  constructor(id: number, settings: Settings, spanSetting: SpanSetting, personSetting?: PersonSetting) {
    this.id = id;
    this._settings = settings;
    this._spanSetting = spanSetting;
    this._personSetting = personSetting;
    this.newSpan();
  }

  private newSpan(): void {
    // todo in future span settings will influence this section

    if (this._personSetting) {
      this._person = new Person(this._settings.idCounter++, this._settings, this._personSetting);
    }
  }

  get fitness(): number {
    // todo in future span settings will influence this section
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  get person(): Person | undefined {
    return this._person;
  }

  evaluate(): void {
    if (!this._person) {
      // if there is no person set then there is nothing wrong
      this._fitness = 1;
      return;
    }

    this._fitness = this._person.fitness;
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
    return `    Span Id: ${this.id}, Setting Id: ${this._spanSetting.id}, ${this._spanSetting.name}
    Span Fitness: ${this._fitness}
    People:
${peopleToString.join('\n')}`;
  }
}
