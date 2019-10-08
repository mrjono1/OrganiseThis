import { Span } from './Span';
import { SpanSetting } from '../settings/SpanSetting';
import { Settings } from '../settings/Settings';

export class Day {
  private _id: number;
  private _settings: Settings;
  private _spanSetting?: SpanSetting;

  private _span?: Span;

  private _fitness?: number;

  constructor(id: number, settings: Settings, spanSetting?: SpanSetting) {
    this._id = id;
    this._settings = settings;
    this._spanSetting = spanSetting;
    this.newDay();
  }

  newDay(): void {
    if (!this._spanSetting) {
      return;
    }
    this._span = new Span(0, this._settings, this._spanSetting);
  }

  get id(): number {
    return this._id;
  }

  public copy(): Day {
    const copy = JSON.parse(JSON.stringify(this)) as Day;
    return copy;
  }
  evaluate(): void {
    if (!this._span) {
      // if there is no span set then there is nothing wrong
      this._fitness = 1;
    }
  }

  get fitness(): number {
    if (!this._fitness) {
      this.evaluate();
    }

    return this._fitness || 0;
  }
}
