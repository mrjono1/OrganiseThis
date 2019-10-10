import { Span } from './Span';
import { Settings, DaySetting } from '../settings';

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
    if (!this._daySetting.spans) {
      this._spans.push(new Span(0, this._settings, { id: 0 }));
      return;
    }

    for (let index = 0; index < this._daySetting.spans.length; index++) {
      const span = new Span(index, this._settings, this._daySetting.spans[index]);
      this._spans.push(span);
    }
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

    return `Day Id: ${this._id}
  Day Evaluated: ${this._fitness ? 'Yes' : 'No'}
  Day Fitness: ${this._fitness}
  Spans:
${spansToString.join('\n')}`;
  }
}
