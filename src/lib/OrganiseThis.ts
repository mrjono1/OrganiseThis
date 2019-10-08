import { PersonSetting } from '../settings/PersonSetting';
import { SpanSetting } from '../settings/SpanSetting';
import { Calendar } from './Calendar';
import { Day } from './Day';
import { Settings } from '../settings/Settings';

export default class OrganiseThis {
  private _name: string;
  private _settings: Settings;

  private _bestCalendar?: Calendar;
  private _bestCalendarFitness?: number;

  constructor(name: string, settings: Settings) {
    this._name = name;
    this._settings = settings;
  }

  public get name(): string {
    return this._name;
  }

  public get bestCalendary(): Calendar | undefined {
    return this._bestCalendar;
  }

  public get bestCalendaryFitness(): number | undefined {
    return this._bestCalendarFitness;
  }

  run(): void {
    const calendars: Calendar[] = [];

    // Generate 100 calendars
    for (let index = 0; index < 100; index++) {
      const calendar = new Calendar(index, this._settings);
      calendars.push(calendar);
    }

    // check if any have 100% fitness
    for (const calendar of calendars) {
      const fitness = calendar.fitness;
      if (fitness === 1) {
        this._bestCalendar = calendar;
        this._bestCalendarFitness = fitness;
        return;
      }
    }
  }
}
