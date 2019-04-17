
/**
 * Returns the bounding box of the given points
 * @param a the 
 */
export function boundingBox(a: [number, number][]): [number, number][]{
    let up =  90, down = 0, l = 10000, r = -10000;
    a.forEach(([x, y]) => {
        up = Math.min(x, up);
        down  = Math.max(x, down);
        l = Math.min(y, l);
        r = Math.max(y, r);
    });

	return [
        [up, l],    // nw
        [down, l],  // sw
        [up, r],    // ne
        [down, r]   // se
    ];
}
