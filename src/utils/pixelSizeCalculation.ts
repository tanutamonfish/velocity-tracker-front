import type { Point } from "../types/Point";

function calculateDistance(p1: Point, p2: Point) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

export function calculatePixelSize(p1: Point, p2: Point, lengthMeters: number): number {
    const lengthPixels = calculateDistance(p1, p2)
    const pixelSize = lengthMeters / lengthPixels // lengthMeters
    return pixelSize
}