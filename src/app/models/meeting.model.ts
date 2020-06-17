export class Meeting {
  constructor(
    public id: string,
    public day: number,
    public month: number,
    public startMil: number,
    public endMil: number,
    public name: string,
    public participants: [],
    public meeetingRoom: string
  ) {}
}
