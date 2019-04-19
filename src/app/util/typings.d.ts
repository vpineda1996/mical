

type LngLatLike = { lng: number; lat: number; } | [number, number];
type LngLatBoundsLike = CustomLngLatBounds | [number, number, number, number];

/**
 * Long-lat declaration from mapbox, double check every time you update mapbox
 * since it might change the api
 */
export class CustomLngLatBounds {
  sw: LngLatLike;
  ne: LngLatLike;

  constructor(boundsLike?: [number, number, number, number]);

  setNorthEast(ne: LngLatLike): this;

  setSouthWest(sw: LngLatLike): this;

  /** Extend the bounds to include a given LngLat or LngLatBounds. */
  extend(obj: mapboxgl.LngLat | mapboxgl.LngLatBounds): this;

  /** Get the point equidistant from this box's corners */
  getCenter(): mapboxgl.LngLat;

  /** Get southwest corner */
  getSouthWest(): mapboxgl.LngLat;

  /** Get northeast corner */
  getNorthEast(): mapboxgl.LngLat;

  /** Get northwest corner */
  getNorthWest(): mapboxgl.LngLat;

  /** Get southeast corner */
  getSouthEast(): mapboxgl.LngLat;

  /** Get west edge longitude */
  getWest(): number;

  /** Get south edge latitude */
  getSouth(): number;

  /** Get east edge longitude */
  getEast(): number;

  /** Get north edge latitude */
  getNorth(): number;

  /** Returns a LngLatBounds as an array */
  toArray(): number[][];

  /** Return a LngLatBounds as a string */
  toString(): string;

  /** Returns a boolean */
  isEmpty(): boolean

  /** Convert an array to a LngLatBounds object, or return an existing LngLatBounds object unchanged. */
  static convert(input: LngLatBoundsLike): mapboxgl.LngLatBounds;
}
