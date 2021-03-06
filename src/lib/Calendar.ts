﻿import { Settings } from 'settings';
import { Day } from 'lib';
import { randomiseArray } from 'helpers';

export class Calendar {
  public readonly id: number;
  public readonly days: Day[];
  public readonly settings: Settings;

  private _fitness?: number;

  constructor(id: number, settings: Settings, days: Day[] = []) {
    this.id = id;
    this.settings = settings;
    this.days = days;
    if (!this.days) {
      this.days = [];
    }
    this.generateDaysFromSettings();
  }

  /**
   * Generate Days from day settings if days were not initalised or empty
   */
  private generateDaysFromSettings(): void {
    if (this.days.length !== 0) {
      return;
    }

    const unsortedDays: Day[] = [];
    for (const daySetting of randomiseArray(this.settings.daySettings)) {
      const day = new Day(this.settings.idCounter++, this.settings, daySetting);
      unsortedDays.push(day);
    }

    // Users will want the days in the correct order, and its easier to test
    const sortedDays = unsortedDays.sort((day1, day2) => day1.daySetting.weekday - day2.daySetting.weekday);
    sortedDays.forEach(day => this.days.push(day));
  }

  public evaluate(): void {
    let dayFitness = 0;
    for (const day of this.days) {
      day.evaluate();
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
    return this._fitness ?? NaN;
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
