import { Settings, DayRoomSetting } from '../settings';
import { Span } from './Span';

export class Room {
  private _id: number;
  private _settings: Settings;
  private _dayRoomSetting: DayRoomSetting;
  private _spans: Span[];
  private _fitness?: number;

  constructor(id: number, settings: Settings, dayRoomSetting: DayRoomSetting) {
    this._id = id;
    this._settings = settings;
    this._dayRoomSetting = dayRoomSetting;
    this._spans = [];
    this.newRoom();
  }

  private newRoom(): void {
    // todo in future span settings will influence this section
  }

  get id(): number {
    return this._id;
  }

  get fitness(): number {
    // todo in future span settings will influence this section
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
  }

  get spans(): Span[] {
    return this._spans;
  }

  evaluate(): void {
    let fitness = 0;
    for (const span of this.spans) {
      fitness += span.fitness;
    }
    this._fitness = this.spans.length === 0 ? 0 : fitness / this.spans.length;
  }

  public copy(): Span {
    const copy = JSON.parse(JSON.stringify(this)) as Span;
    return copy;
  }

  public toString(): string {
    const toString: string[] = [];

    for (const span of this.spans) {
      toString.push(span.toString());
    }

    return `Room Id: ${this._id}, Setting Id: ${this._dayRoomSetting.id}, ${name}
  Room Fitness: ${this._fitness}
  Spans:
${toString.join('\n')}`;
  }
}
