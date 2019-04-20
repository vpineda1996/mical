type LngLatLike = { lng: number; lat: number; } | [number, number];
type LngLatBoundsLike = CustomLngLatBounds | [number, number, number, number];

/**
 * Long-lat declaration from mapbox, double check every time you update mapbox
 * since it might change the api
 */
export class CustomLngLatBounds {

  /** Get west edge longitude */
  getWest(): number;

  /** Get south edge latitude */
  getSouth(): number;

  /** Get east edge longitude */
  getEast(): number;

  /** Get north edge latitude */
  getNorth(): number;
}
