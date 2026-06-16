import { useEffect, useRef, useState } from "react";
import { getIntersection } from "../utils/getIntersection";
import { generateRays } from "../utils/generateRays";

function CanvasStage({
  fov,
  rayCount,
  walls,
  setWalls,
  setIntersectionCount: setIntersectionCountProp,
  setLightPos: setLightPosProp,
  setFps: setFpsProp,
  setLatency: setLatencyProp,
  running,
  rotation,
 showRays,
showVision,
}) {
  const canvasRef = useRef(null);
  const fpsLastRef = useRef(performance.now());

const frameCountRef = useRef(0);

  const [lightPos, setLightPos] = useState({
    x: 400,
    y: 300,
  });

  const [isDrawing, setIsDrawing] =
    useState(false);

  const [startPoint, setStartPoint] =
    useState(null);

  const [currentPoint, setCurrentPoint] =
    useState(null);

  const [
    intersectionCount,
    setIntersectionCount,
  ] = useState(0);

  // ==========================
  // SAVE WALLS TO LOCAL STORAGE
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "walls",
      JSON.stringify(walls)
    );
  }, [walls]);

  // ==========================
  // MAIN DRAWING EFFECT
  // ==========================
  // RequestAnimationFrame driven draw loop so we can measure FPS and latency
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let rafId = null;
    // persist counters across effect reruns


    function renderFrame() {
      const frameStart = performance.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle =
  "rgba(255,255,255,0.08)";

ctx.lineWidth = 1;

for (
  let x = 0;
  x < canvas.width;
  x += 25
) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.stroke();
}

for (
  let y = 0;
  y < canvas.height;
  y += 25
) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.stroke();
}

      // draw walls
      walls.forEach((wall) => {
        ctx.beginPath();
        ctx.moveTo(wall.x1, wall.y1);
        ctx.lineTo(wall.x2, wall.y2);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      // preview wall
      if (isDrawing && startPoint && currentPoint) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // generate rays
      const rayLength = 2000;
      console.log("Rotation:", rotation);
      const rays = generateRays(lightPos, rayCount, rayLength, fov, rotation);
      const visionPoints = [];
      let totalHits = 0;

      rays.forEach((ray) => {
        let closestHit = null;
        let shortestDistance = Infinity;

        walls.forEach((wall) => {
          const hit = getIntersection(ray, wall);
          if (hit) {
            totalHits++;
            const distance = Math.hypot(hit.x - lightPos.x, hit.y - lightPos.y);
            if (distance < shortestDistance) {
              shortestDistance = distance;
              closestHit = hit;
            }
          }
        });

       if (showRays) {
  ctx.beginPath();

  ctx.moveTo(
    lightPos.x,
    lightPos.y
  );

  if (closestHit) {
    ctx.lineTo(
      closestHit.x,
      closestHit.y
    );
  } else {
    ctx.lineTo(
      ray.x2,
      ray.y2
    );
  }

  ctx.strokeStyle =
    "white";

  ctx.lineWidth = 1;

  ctx.stroke();
}});

      // vision polygon
      if (
  showVision &&
  visionPoints.length > 0
)  {
        ctx.beginPath();
        ctx.moveTo(lightPos.x, lightPos.y);
        visionPoints.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.fillStyle = "rgba(255,255,0,0.15)";
        ctx.fill();
      }

      // light source
      ctx.beginPath();
      ctx.arc(lightPos.x, lightPos.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();

      // update telemetry
    // update telemetry

setIntersectionCount(totalHits);

if (
  typeof setIntersectionCountProp ===
  "function"
) {
  setIntersectionCountProp(totalHits);
}

if (
  typeof setLightPosProp ===
  "function"
) {
  setLightPosProp(lightPos);
}

// FPS Calculation

frameCountRef.current++;

const nowMs = performance.now();

if (
  nowMs - fpsLastRef.current >= 500
) {
  const interval =
    (nowMs - fpsLastRef.current) /
    1000;

  const measuredFps =
    Math.round(
      frameCountRef.current /
      Math.max(
        0.001,
        interval
      )
    );

  if (
    typeof setFpsProp ===
    "function"
  ) {
    setFpsProp(measuredFps);
  }

  frameCountRef.current = 0;

  fpsLastRef.current = nowMs;
}

// Latency Calculation

const frameEnd =
  performance.now();

const drawLatency =
  Math.round(
    frameEnd - frameStart
  );

if (
  typeof setLatencyProp ===
  "function"
) {
  setLatencyProp(drawLatency);
}
}
function loop() {
  const frameStart = performance.now();
  renderFrame();

      // schedule next frame only if running
      if (running) {
        rafId = requestAnimationFrame(loop);
      }
    }

    // If running, start continuous RAF loop; otherwise render one static frame so walls/rays persist
    if (running) {
      rafId = requestAnimationFrame(loop);
    } else {
      // draw a single frame to keep walls/rays visible after reload
      renderFrame();
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    lightPos,
    fov,
    rayCount,
    walls,
    isDrawing,
    startPoint,
    currentPoint,
    running,
  ]);

  // ==========================
  // MOVE LIGHT SOURCE
  // ==========================

  const handleMouseMove = (
    e
  ) => {
    const canvas =
      canvasRef.current;

    const rect =
      canvas.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    setLightPos({
      x,
      y,
    });

    if (typeof setLightPosProp === "function") {
      setLightPosProp({ x, y });
    }

    if (isDrawing) {
      setCurrentPoint({
        x,
        y,
      });
    }
  };

  // ==========================
  // START WALL DRAW
  // ==========================

  const handleMouseDown = (
    e
  ) => {
    const canvas =
      canvasRef.current;

    const rect =
      canvas.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    setStartPoint({
      x,
      y,
    });

    setCurrentPoint({
      x,
      y,
    });

    setIsDrawing(true);
  };

  // ==========================
  // FINISH WALL DRAW
  // ==========================

  const handleMouseUp =
    () => {
      if (
        !startPoint ||
        !currentPoint
      )
        return;

      const newWall = {
        x1: startPoint.x,
        y1: startPoint.y,
        x2: currentPoint.x,
        y2: currentPoint.y,
      };

      setWalls(
        (prevWalls) => [
          ...prevWalls,
          newWall,
        ]
      );

      setIsDrawing(false);

      setStartPoint(null);

      setCurrentPoint(null);
    };

   return (
  <>
    <div className="viewport-container">

      <div className="viewport-header">
        <span>RENDERING VIEWPORT</span>

        <span>
          {rayCount} Rays | FOV {fov}°
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="simulator-canvas"
      />

    </div>

    <div className="mini-telemetry">
      <p>
        Light Position:
        (
        {Math.round(lightPos.x)},
        {Math.round(lightPos.y)}
        )
      </p>

      <p>
        Intersections:
        <span className="metric-value">
          {intersectionCount}
        </span>
      </p>

      <p>
        Total Walls:
        <span className="metric-value">
          {walls.length}
        </span>
      </p>
    </div>
  </>
);
}
export default CanvasStage;