export function generateRays(
  lightPos,
  rayCount,
  rayLength,
  fov,
  rotation,
) {
  const rays = [];

  const fovRadians =
    (fov * Math.PI) / 180;
const rotationRadians =
  (rotation * Math.PI) / 180;

const startAngle =
  rotationRadians -
  fovRadians / 2;

  const angleStep =
    fovRadians / rayCount;

  for (let i = 0; i < rayCount; i++) {
    const angle =
      startAngle + i * angleStep;

    const endX =
      lightPos.x +
      Math.cos(angle) * rayLength;

    const endY =
      lightPos.y +
      Math.sin(angle) * rayLength;

    rays.push({
      x1: lightPos.x,
      y1: lightPos.y,
      x2: endX,
      y2: endY,
    });
  }

  return rays;
}