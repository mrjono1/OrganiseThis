import { Day } from './Day';
import { Settings } from '../settings';

export class Calendar {
  public readonly id: number;
  public readonly days: Day[];
  public readonly settings: Settings;

  private _fitness?: number;

  constructor(id: number, settings: Settings, days: Day[] = []) {
    this.id = id;
    this.settings = settings;
    this.days = days;

    this.newCalendar();
  }

  private newCalendar(): void {
    if (this.days.length !== 0) {
      return;
    }
    for (const daySetting of this.settings.daySettings) {
      const day = new Day(this.settings.idCounter++, this.settings, daySetting);
      this.days.push(day);
    }
  }

  evaluate(): void {
    let dayFitness = 0;
    for (const day of this.days) {
      dayFitness += day.fitness;
    }
    let fitness = dayFitness / this.days.length;

    // Person settings
    for (const personSetting of this.settings.personSettings) {
      if (personSetting.availability && personSetting.availability.maxNumberOfSpans !== undefined) {
        let numberOfSpans = 0;
        for (const day of this.days) {
          for (const room of day.rooms) {
            for (const span of room.spans) {
              if (span.person && span.person.personSetting.id === personSetting.id) {
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
    if (this.days) {
      for (const day of this.days) {
        daysToString.push(day.toString());
      }
    }
    return `Calendar Id: ${this.id}
Calendar Fitness: ${this._fitness}${this._fitness === 1 ? ' (Best Possible Result)' : ''}
Days:
${daysToString.join('\n')}`;
  }
}
