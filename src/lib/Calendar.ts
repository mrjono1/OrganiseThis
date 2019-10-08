﻿import { Day } from './Day';
import { Settings } from '../settings/Settings';

export class Calendar {
  private _id: number;
  private _settings: Settings;
  private _days: Day[];

  private _fitness?: number;

  constructor(id: number, settings: Settings) {
    this._id = id;
    this._settings = settings;
    this._days = [];

    this.newCalendar();
  }

  private newCalendar() {
    for (let index = 0; index < this._settings.spans.length; index++) {
      const day = new Day(index, this._settings, this._settings.spans[index]);
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
    this._fitness = dayFitness / this._days.length;
  }

  get fitness(): number {
    if (!this._fitness) {
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
Calendar Evaluated: ${this._fitness ? 'Yes' : 'No'}
Calendar Fitness: ${this._fitness}${this._fitness === 1 ? ' (Best Possible Result)' : ''}
Days:
${daysToString.join('\n')}`;
  }
}