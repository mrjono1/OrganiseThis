import { Day } from './Day';
import { Settings } from '../settings';

export class Calendar {
  private _id: number;
  private _settings: Settings;
  private _days: Day[];

  private _dayIdCounter = 0;

  private _fitness?: number;

  constructor(id: number, settings: Settings) {
    this._id = id;
    this._settings = settings;
    this._days = [];

    this.newCalendar();
  }

  private newCalendar(): void {
    for (const daySetting of this._settings.daySettings) {
      const day = new Day(this._dayIdCounter++, this._settings, daySetting);
      this._days.push(day);
    }
  }

  get id(): number {
    return this._id;
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
    return `Calendar Id: ${this._id}
Calendar Fitness: ${this._fitness}${this._fitness === 1 ? ' (Best Possible Result)' : ''}
Days:
${daysToString.join('\n')}`;
  }
}
