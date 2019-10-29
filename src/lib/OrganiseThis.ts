import { Calendar } from './Calendar';
import { Settings } from '../settings';
import { DefaultSettings } from '../defaults';
import { transform } from './TransformSettings';

export default class OrganiseThis {
  private _name: string;
  private _settings: Settings;

  private _bestCalendar?: Calendar;
  private _iterations?: number;

  constructor(name: string, settings: Partial<Settings>) {
    this._name = name;
    this._settings = {
      ...DefaultSettings,
      ...settings
    };
  }

  public get name(): string {
    return this._name;
  }

  public get bestCalendar(): Calendar | undefined {
    return this._bestCalendar;
  }

  public get iterations(): number {
    return this._iterations || 0;
  }

  public get setting(): Settings {
    return this._settings;
  }

  public toString(): string {
    if (!this._bestCalendar) {
      return 'No Canidate Calenders found';
    }

    return `OrganiseThis Name:${this._name}
${this._bestCalendar.toString()}`;
  }

  run(): void {
    this._settings = transform(this._settings);

    const calendars: Calendar[] = [];

    // Generate 100 calendars
    for (let index = 0; index < 100; index++) {
      const calendar = new Calendar(index, this._settings);
      calendars.push(calendar);
    }

    // check if any have 100% fitness
    this._iterations = 0;
    for (const calendar of calendars) {
      this._iterations++;
      if (calendar.fitness === 1) {
        this._bestCalendar = calendar;
        return;
      }
    }

    const sortedCalendars = calendars.sort((a: Calendar, b: Calendar) => {
      return b.fitness - a.fitness;
    });

    this._bestCalendar = sortedCalendars[0];
  }
}
