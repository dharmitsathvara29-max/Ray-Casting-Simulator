export function getIntersection(ray, wall) {
  const x1 = wall.x1;
  const y1 = wall.y1;
  const x2 = wall.x2;
  const y2 = wall.y2;

  const x3 = ray.x1;
  const y3 = ray.y1;
  const x4 = ray.x2;
  const y4 = ray.y2;

  const den =
    (x1 - x2) * (y3 - y4) -
    (y1 - y2) * (x3 - x4);

  if (den === 0) return null;

  const t =
    ((x1 - x3) * (y3 - y4) -
      (y1 - y3) * (x3 - x4)) /
    den;

  const u =
    -(
      ((x1 - x2) * (y1 - y3) -
        (y1 - y2) * (x1 - x3)) /
      den
    );

  if (t > 0 && t < 1 && u > 0) {
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
    };
  }

  return null;
}
