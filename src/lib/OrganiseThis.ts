import { Calendar } from './Calendar';
import { Settings } from '../settings';
import { DefaultSettings } from '../defaults';
import { transform } from './TransformSettings';
import { deepClone } from '../helpers/clone';
import { crossover } from './Crossover';

export default class OrganiseThis {
  public readonly name: string;
  public readonly settings: Settings;

  private _bestCalendar?: Calendar;
  private _iterations?: number;

  constructor(name: string, settings: Partial<Settings>) {
    this.name = name;
    this.settings = transform({
      ...DefaultSettings,
      ...settings
    });
  }

  public get bestCalendar(): Calendar | undefined {
    return this._bestCalendar;
  }

  public get iterations(): number {
    return this._iterations ?? 0;
  }

  public toString(): string {
    if (!this._bestCalendar) {
      return 'No Canidate Calenders found';
    }

    return `OrganiseThis Name:${this.name}
${this._bestCalendar.toString()}`;
  }

  run(): void {
    let calendars: Calendar[] = this.generateInitalPopulation();

    for (let generationIndex = 0; generationIndex < this.settings.numberOfGenerations; generationIndex++) {
      if (generationIndex !== 0) {
        calendars = this.generateNextGeneration(calendars);
      }

      // check if any have 100% fitness
      this._iterations = 0;
      for (const calendar of calendars) {
        if (typeof calendar.evaluate !== 'function') {
          calendar.evaluate();
        }
        calendar.evaluate();
        this._iterations++;
        if (calendar.fitness === 1) {
          this._bestCalendar = calendar;
          break;
        }
      }

      if (this._bestCalendar) {
        break;
      }
      calendars = calendars.sort((a: Calendar, b: Calendar) => {
        return b.fitness - a.fitness;
      });
    }

    if (!this._bestCalendar) {
      this._bestCalendar = calendars[0];
    }
  }

  generateInitalPopulation(): Calendar[] {
    const calendars: Calendar[] = [];

    // Generate a population of calendars
    for (let index = 0; index < this.settings.numberOfCalendars; index++) {
      const calendar = new Calendar(this.settings.idCounter++, this.settings);
      calendars.push(calendar);
    }
    return calendars;
  }

  generateNextGeneration(currentCalendars: Calendar[]): Calendar[] {
    const nextGeneration: Calendar[] = [];

    for (
      let calendarToKeepIndex = 0;
      calendarToKeepIndex < this.settings.selection.bestCalendarsToKeep;
      calendarToKeepIndex++
    ) {
      nextGeneration.push(deepClone<Calendar>(currentCalendars[calendarToKeepIndex]));
    }

    const crossoverOffSpring = crossover(this.settings, currentCalendars);
    crossoverOffSpring.forEach(calendar => nextGeneration.push(calendar));

    // add in some existing calendars to pad out the next generation
    for (const calendar of currentCalendars.splice(this.settings.selection.bestCalendarsToKeep)) {
      if (nextGeneration.length === this.settings.numberOfCalendars) {
        break;
      }
      nextGeneration.push(calendar);
    }

    // These errors should never happen but it it does I have useful error messages
    if (nextGeneration.length < this.settings.numberOfCalendars) {
      throw `generateNextGeneration has failed there is not enough calendars (${nextGeneration.length}/${this.settings.numberOfCalendars})`;
    }
    if (nextGeneration.length > this.settings.numberOfCalendars) {
      throw `generateNextGeneration has failed there is too many calendars (${nextGeneration.length}/${this.settings.numberOfCalendars})`;
    }
    return nextGeneration;
  }
}
