import { Availability } from '.';

export class PersonSetting {
  private _id: number;
  private _name: string;
  private _availability?: Availability;

  constructor(id: number, name: string, availability?: Availability) {
    this._id = id;
    this._name = name;
    this._availability = availability;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get availability(): Availability | undefined {
    return this._availability;
  }
}
