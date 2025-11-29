import type { Point } from "./Point"

export interface Rectangle {
    point: Point
    width: number
    height: number
}

export interface Line {
    first: Point
    second: Point
}