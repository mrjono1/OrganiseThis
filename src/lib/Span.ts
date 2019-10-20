import { Settings, PersonSettings, SpanSettings } from '../settings';
import { Person } from './Person';

export class Span {
  private _id: number;
  private _settings: Settings;
  private _spanSettings: SpanSettings;

  private _personSettings?: PersonSettings;

  private _person?: Person;

  private _fitness?: number;

  constructor(id: number, settings: Settings, spanSettings: SpanSettings, personSettings?: PersonSettings) {
    this._id = id;
    this._settings = settings;
    this._spanSettings = spanSettings;
    this._personSettings = personSettings;
    this.newSpan();
  }

  private newSpan(): void {
    // todo in future span settings will influence this section

    if (this._personSettings) {
      this._person = new Person(0, this._settings, this._personSettings);
    }
  }

  get id(): number {
    return this._id;
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
    return `    Span Id: ${this._id}, Setting Id: ${this._spanSettings.id}, ${this._spanSettings.name}
    Span Fitness: ${this._fitness}
    People:
${peopleToString.join('\n')}`;
  }
}
