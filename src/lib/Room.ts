import { Settings, DayRoomSetting } from '../settings';
import { Span } from './Span';

export class Room {
  public readonly id: number;
  private _settings: Settings;
  private _dayRoomSetting: DayRoomSetting;
  public readonly spans: Span[];
  private _fitness?: number;

  constructor(id: number, settings: Settings, dayRoomSetting: DayRoomSetting) {
    this.id = id;
    this._settings = settings;
    this._dayRoomSetting = dayRoomSetting;
    this.spans = [];
    this.newRoom();
  }

  private newRoom(): void {
    // todo in future span settings will influence this section
  }

  get fitness(): number {
    // todo in future span settings will influence this section
    if (this._fitness === undefined) {
      this.evaluate();
    }

    return this._fitness || 0;
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

    return `Room Id: ${this.id}, Setting Id: ${this._dayRoomSetting.id}, ${name}
  Room Fitness: ${this._fitness}
  Spans:
${toString.join('\n')}`;
  }
}
