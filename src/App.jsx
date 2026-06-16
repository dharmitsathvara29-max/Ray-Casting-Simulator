import { useState } from "react";
import CanvasStage from "./components/CanvasStage";
import SimulatorConsole from "./components/SimulatorConsole";
import OpticsTelemetryHUD from "./components/OpticsTelemetryHUD";
import defaultWalls from "./data/defaultWalls";

function App() {
  const [fov, setFov] = useState(360);

  const [rayCount, setRayCount] =
    useState(360);
    const [rotation, setRotation] =
  useState(0);

const [showRays, setShowRays] = useState(true);
const [showVision, setShowVision] = useState(true);
const [walls, setWalls] =
  useState(() => {
    const savedWalls =
      localStorage.getItem("walls");

    return savedWalls
      ? JSON.parse(savedWalls)
      : defaultWalls;
  });

  // Telemetry and runtime controls
  const [intersectionCount, setIntersectionCount] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(0);
  const [running, setRunning] = useState(false);

 return (
  <div className="app-layout">

    <div className="sidebar">
      <SimulatorConsole
        fov={fov}
        setFov={setFov}
        rayCount={rayCount}
        rotation={rotation}
        setRotation={setRotation}
        setRayCount={setRayCount}
         showRays={showRays}
  setShowRays={setShowRays}
  showVision={showVision}
  setShowVision={setShowVision}
        setWalls={setWalls}
        walls={walls}
        running={running}
        setRunning={setRunning}
        exportWalls={() => {
          const data = JSON.stringify(
            walls,
            null,
            2
          );

          const blob = new Blob(
            [data],
            {
              type:
                "application/json",
            }
          );

          const url =
            URL.createObjectURL(
              blob
            );

          const a =
            document.createElement(
              "a"
            );

          a.href = url;
          a.download =
            "walls.json";

          a.click();

          URL.revokeObjectURL(
            url
          );
        }}
      />
    </div>

    <div className="main-panel">
     <CanvasStage
  fov={fov}
  rayCount={rayCount}
  rotation={rotation}
  walls={walls}
  setWalls={setWalls}
  setIntersectionCount={
    setIntersectionCount
  }
 showRays={showRays}
showVision={showVision}
  setLightPos={setLightPos}
  setFps={setFps}
  setLatency={setLatency}
  running={running}
/>
      <OpticsTelemetryHUD
        lightPos={lightPos}
        rayCount={rayCount}
        wallCount={walls.length}
        intersectionCount={
          intersectionCount
        }
        fps={fps}
        latency={latency}
      />
    </div>

  </div>
);}

export default App;