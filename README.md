# React + Vite
🔦 Ray-Casting 2D Vector Vision Simulator

Ray-Casting 2D Vector Vision Simulator is a real-time computational geometry and graphics visualization laboratory built entirely with ReactJS and HTML5 Canvas. The simulator projects hundreds of dynamic light rays from a movable light source, calculates ray-boundary intersections using vector mathematics, and renders an interactive field-of-vision system in real time.

Inspired by early graphics engines like Wolfenstein 3D and modern LiDAR-based robotics systems, this project demonstrates client-side ray tracing, collision detection, vector mathematics, and high-performance rendering without any backend server.

🌐 Live Demo

Ray-Casting 2D Vector Vision Simulator

A real-time optics and computational geometry simulator demonstrating vector intersection mathematics, field-of-view rendering, and dynamic light propagation.

📸 Screenshots
<img width="1128" height="547" alt="Screenshot 2026-06-16 at 6 42 54 PM" src="https://github.com/user-attachments/assets/9915c0ec-85bb-42ae-9ca0-f63f51400bbc" />
<img width="1016" height="372" alt="Screenshot 2026-06-16 at 6 43 02 PM" src="https://github.com/user-attachments/assets/5f0d1dcd-ccc9-4ef9-b5b1-91054b4f7c6b" />
<img width="693" height="541" alt="Screenshot 2026-06-16 at 6 43 43 PM" src="https://github.com/user-attachments/assets/1fb57789-9210-42f0-8d4c-507fefa156ae" />

Export all custom wall coordinates as a JSON geometry profile.

✨ Features
Feature	Status
Real-Time Ray Casting Engine	
Ray-Line Intersection Mathematics	
Dynamic FOV Adjustment	
Adjustable Ray Density	
Rotation Angle Control	
Interactive Wall Placement	
Maze Template Loader	
LocalStorage Persistence	
FPS Counter	
Latency Counter
Geometry JSON Export	
Vision Polygon Rendering	
RequestAnimationFrame Rendering Loop	
Grid Background	Optional
Toggle Rays / Vision Mode	Optional
Draggable Walls	Future Enhancement
📋 Feature Details
1. Real-Time Ray Casting Engine
Projects hundreds of rays outward from a movable light source using vector mathematics. Every frame recalculates ray directions and intersections.
2. Ray-Line Intersection Engine
Uses determinant-based parametric line intersection equations:

The simulator finds the closest valid intersection point for every ray and renders the visible environment boundary.

3. Dynamic Field Of View (FOV)

Users can configure the optical sweep angle from:

Narrow directional beam (30°)
Wide scanning cone
Full circular scan (360°)

The ray matrix automatically recalculates.

4. Ray Density Controller

Controls how many rays are projected per frame.

Examples:

50 Rays → Lightweight simulation
360 Rays → Detailed visibility scan
720 Rays → High precision environment mapping
5. Rotation Angle Controller

Allows directional steering of the ray emitter.

Useful for simulating:

Security cameras
LiDAR scanners
Robot vision systems
Spotlight systems
6. Interactive Boundary Placement

Users can click and drag inside the canvas to create new wall segments.

New walls are instantly registered into the intersection engine.

7. Vision Polygon Rendering

The closest intersection points are chained together into a visibility polygon.

This produces a realistic illuminated field-of-view region while leaving unseen areas in shadow.

8. Maze Template Loader

Loads predefined wall structures to test:

Complex visibility
Shadow generation
Obstacle avoidance
Intersection accuracy
9. LocalStorage Environment Persistence

Custom environments are automatically saved.

Stored data includes:

Wall coordinates
Environment configuration

All layouts are restored after browser refresh.

10. System Telemetry HUD

Displays real-time diagnostics:

Light Source Position
Ray Count
Total Walls
Total Intersections
FPS (Frames Per Second)
Rendering Latency (ms)
11. Geometry Export Utility

Exports all wall coordinates as:

[
  {
    "x1": 100,
    "y1": 200,
    "x2": 350,
    "y2": 220
  }
]

Useful for saving environments and future simulations.

⚙️ Tech Stack
Technology	Purpose
ReactJS	UI Framework
Vite	Build Tool
HTML5 Canvas	Real-Time Rendering
JavaScript ES6	Logic & Math Engine
CSS3	Styling
LocalStorage API	Persistence
requestAnimationFrame	Rendering Loop
📂 Project Structure
RayCastingSimulator/
│
├── public/
│
├── src/
│
├── components/
│   ├── CanvasStage.jsx
│   ├── SimulatorConsole.jsx
│   ├── OpticsTelemetryHUD.jsx
│
├── utils/
│   ├── generateRays.js
│   ├── getIntersection.js
│
├── data/
│   ├── defaultWalls.js
│   ├── mazeTemplate.js
│
├── App.jsx
├── main.jsx
│
├── package.json
├── vite.config.js
│
└── README.md
🚀 Setup & Run
Clone Repository
git clone <repository-url>
cd RayCastingSimulator
Install Dependencies
npm install
Start Development Server
npm run dev
Build Production Version
npm run build
📈 Performance Highlights
Fully Client-Side Rendering
Zero Backend Dependencies
Real-Time Vector Computation
60 FPS Rendering Pipeline
Deterministic Intersection Mathematics
High-Density Ray Simulation
Persistent Local Workbench Storage
🔮 Future Enhancements
Draggable Existing Walls
Multiple Light Sources
Colored Lighting System
Reflection & Bounce Rays
Shadow Softening
Minimap Mode
LiDAR Scanner Simulation
3D Projection View
Physics-Based Light Attenuation
