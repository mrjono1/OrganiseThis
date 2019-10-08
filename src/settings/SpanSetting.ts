export class SpanSetting {
  private _id: number;
  private _date: Date;

  constructor(id: number, date: Date) {
    this._id = id;
    this._date = date;
  }

  get id(): number {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }
}
