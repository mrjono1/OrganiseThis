import { Day } from './Day';
import { Settings } from '../settings';

export class Calendar {
  public readonly id: number;

  private _settings: Settings;

  private _days: Day[];
  private _fitness?: number;

  constructor(id: number, settings: Settings, days: Day[] = []) {
    this.id = id;
    this._settings = settings;
    this._days = days;

    this.newCalendar();
  }

  public days(): Day[] {
    return this._days;
  }

  private newCalendar(): void {
    if (this.days.length !== 0) {
      return;
    }
    for (const daySetting of this._settings.daySettings) {
      const day = new Day(this._settings.idCounter++, this._settings, daySetting);
      this._days.push(day);
    }
  }

  evaluate(): void {
    let dayFitness = 0;
    for (const day of this._days) {
      dayFitness += day.fitness;
    }
    let fitness = dayFitness / this._days.length;

    // Person settings
    for (const personSetting of this._settings.personSettings) {
      if (personSetting.availability && personSetting.availability.maxNumberOfSpans !== undefined) {
        let numberOfSpans = 0;
        for (const day of this._days) {
          for (const room of day.rooms) {
            for (const span of room.spans) {
              if (span.person && span.person.settings.id === personSetting.id) {
                numberOfSpans++;
              }
            }
          }
        }
        if (numberOfSpans > personSetting.availability.maxNumberOfSpans) {
          fitness += 0.1;
        }
      }
    }

    this._fitness = fitness;
  }

  get fitness(): number {
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  public toString(): string {
    const daysToString: string[] = [];
    if (this._days) {
      for (const day of this._days) {
        daysToString.push(day.toString());
      }
    }
    return `Calendar Id: ${this.id}
Calendar Fitness: ${this._fitness}${this._fitness === 1 ? ' (Best Possible Result)' : ''}
Days:
${daysToString.join('\n')}`;
  }
}
