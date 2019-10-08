import { Day } from './Day';
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
    for (const span of this._settings.spans) {
      const day = new Day(0, this._settings, span);
      this._days.push(day);
    }
  }

  get id(): number {
    return this._id;
  }
  evaluate(): void {
    // TODO: evaluate properly
    this._fitness = 1;
  }

  get fitness(): number {
    if (!this._fitness) {
      this.evaluate();
    }

    return this._fitness || 0;
  }
}
