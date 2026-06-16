function OpticsTelemetryHUD({
  lightPos,
  rayCount,
  wallCount,
  intersectionCount,
  fps,
  latency,
}) {
  return (
  <div className="telemetry-hud">
    <div className="telemetry-card">
      <h4>LIGHT</h4>
      <p>
        ({Math.round(lightPos.x)},
        {Math.round(lightPos.y)})
      </p>
    </div>

    <div className="telemetry-card">
      <h4>RAYS</h4>
      <p>{rayCount}</p>
    </div>

    <div className="telemetry-card">
      <h4>WALLS</h4>
      <p>{wallCount}</p>
    </div>

    <div className="telemetry-card">
      <h4>INTERSECTIONS</h4>
      <p>{intersectionCount}</p>
    </div>

    <div className="telemetry-card">
      <h4>FPS</h4>
      <p>{fps}</p>
    </div>

    <div className="telemetry-card">
      <h4>LATENCY</h4>
      <p>{latency} ms</p>
    </div>
  </div>
);
}
export default OpticsTelemetryHUD;