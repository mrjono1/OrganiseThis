import { Room } from 'lib';
import { Settings, DaySetting } from 'settings';
import { Weekday } from 'types';
import { randomiseArray } from 'helpers';

export class Day {
  public readonly id: number;
  public readonly settings: Settings;
  public readonly daySetting: DaySetting;
  public readonly rooms: Room[];

  private _fitness?: number;

  constructor(id: number, settings: Settings, daySetting: DaySetting) {
    this.id = id;
    this.settings = settings;
    this.daySetting = daySetting;
    this.rooms = [];
    this.newDay();
  }

  newDay(): void {
    const personIndexesUsed: number[] = [];

    if (!this.daySetting.dayRoomSettings) {
      return;
    }

    // Create the Rooms in the day
    for (const dayRoomSetting of randomiseArray(this.daySetting.dayRoomSettings)) {
      const room = new Room(this.settings.idCounter++, this.settings, dayRoomSetting, personIndexesUsed);
      this.rooms.push(room);
    }
  }

  evaluate(): void {
    let fitness = 0;

    for (const room of this.rooms) {
      room.evaluate();
      fitness += room.fitness;
    }

    this._fitness = this.rooms.length === 0 ? 0 : fitness / this.rooms.length;
  }

  get fitness(): number {
    return this._fitness ?? NaN;
  }

  public toString(): string {
    const roomsToString: string[] = [];

    for (const room of this.rooms) {
      roomsToString.push(room.toString());
    }

    const name = this.daySetting.weekday ? Weekday[this.daySetting.weekday].toString() : '';
    return `Day Id: ${this.id}, Setting Id: ${this.daySetting.id}, ${name}
  Day Fitness: ${this._fitness}
  Rooms:
${roomsToString.join('\n')}`;
  }
}
