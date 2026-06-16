import mazeTemplate from "../data/mazeTemplate";

function SimulatorConsole({
  fov,
  setFov,
  rayCount,
  setRayCount,
  setWalls,
  walls,
  running,
  setRunning,
  exportWalls,
  rotation,
  setRotation,
  showRays,
  setShowRays,
  showVision,
  setShowVision,
}) {

  function handleLoadMaze() {
    setWalls(mazeTemplate);
  }

  function handleFlushCache() {
    localStorage.removeItem("walls");
    // reset to default empty room
    setWalls([]);
  }

  return (
     
   <div className="control-panel">
    <h1 className="sim-title">
      RAY CASTING SIMULATOR
    </h1>
    <h3 className="control-title">
      SYSTEM CONTROL PANEL
    </h3>
    <div
  className={
    running
      ? "status-active"
      : "status-idle"
  }
>
  STATUS :
  {running
    ? " ACTIVE"
    : " IDLE"}
</div>
<div className="button-grid">
        <button
          className="control-btn"
          onClick={() => setRunning(!running)}
        >
          {running
            ? "Stop Ray Sweeper"
            : "Initialize Ray Sweeper"}
        </button>

        <button
         className="control-btn"
          onClick={() => {
            setWalls([]);
          }}
        >
          Clear Boundaries
        </button>

        <button
     className="control-btn"
          onClick={handleLoadMaze}
        >
          Load Maze Template
        </button>

        <button
          className="control-btn"
          onClick={handleFlushCache}
        >
          Flush Cache
        </button>

        <button
         className="control-btn"
          onClick={() => {
            if (typeof exportWalls === "function")
              exportWalls();
          }}
        >
          Export Geometry (JSON)
        </button>
      </div>

      <br />

      <div className="slider-box">
  <label>
    FIELD OF VIEW
  </label>

  <div className="slider-value">
    {fov}°
  </div>

        <br />

        <input className="slider"
          type="range"
          min="30"
          max="360"
          value={fov}
          onChange={(e) =>
            setFov(Number(e.target.value))
          }
        />
      </div>

      <br />

      <div className="slider-box">
  <label>
    RAY COUNT
  </label>

  <div className="slider-value">
    {rayCount}
  </div>
        <br />

        <input className="slider"
          type="range"
          min="50"
          max="720"
          value={rayCount}
          onChange={(e) =>
            setRayCount(Number(e.target.value))
          }
        />
      </div>
      <br />

<div>
  <label>
    Rotation: {rotation}°
  </label>

  <br />

  <input
    className="slider"
    type="range"
    min="0"
    max="360"
    value={rotation}
    onChange={(e) =>
      setRotation(
        Number(e.target.value)
      )
    }
  />
</div>
<br />
<br />

<div>
  <label>
    <input
      type="checkbox"
      checked={showRays}
      onChange={() =>
        setShowRays(!showRays)
      }
    />

    Render Ray Paths
  </label>
</div>

<br />

<div>
  <label>
    <input
      type="checkbox"
      checked={showVision}
      onChange={() =>
        setShowVision(!showVision)
      }
    />

    Render Vision Polygon
  </label>
</div>
    </div>
  );
}

export default SimulatorConsole;