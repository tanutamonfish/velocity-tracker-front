interface IPoint {
    x:number
    y:number
}

export class Point implements IPoint {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}
}