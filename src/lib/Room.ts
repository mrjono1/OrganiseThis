import { Settings, DayRoomSetting } from 'settings';
import { Span } from 'lib';

export class Room {
  public readonly id: number;
  public readonly settings: Settings;
  public readonly dayRoomSetting: DayRoomSetting;
  public readonly spans: Span[];

  private _fitness?: number;

  constructor(id: number, settings: Settings, dayRoomSetting: DayRoomSetting) {
    this.id = id;
    this.settings = settings;
    this.dayRoomSetting = dayRoomSetting;
    this.spans = [];
    this.newRoom();
  }

  private newRoom(): void {
    // todo in future span settings will influence this section
  }

  get fitness(): number {
    return this._fitness ?? NaN;
  }

  evaluate(): void {
    let fitness = 0;
    for (const span of this.spans) {
      span.evaluate();
      fitness += span.fitness;
    }
    this._fitness = this.spans.length === 0 ? 0 : fitness / this.spans.length;
  }

  public toString(): string {
    const toString: string[] = [];

    for (const span of this.spans) {
      toString.push(span.toString());
    }

    return `Room Id: ${this.id}, Setting Id: ${this.dayRoomSetting.id}, ${name}
  Room Fitness: ${this._fitness}
  Spans:
${toString.join('\n')}`;
  }
}
