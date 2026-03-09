import { useState } from "react";

export default function App() {
  
  const [sensors, setSensors] = useState({
    fsr: 0,
    hr: 0,
    spo2: 0,
    accel: 0,
    motion: 0
  });

  const [riskScore, setRiskScore] = 
    useState(0);
  const [riskLevel, setRiskLevel] = 
    useState("NORMAL");
  const [connected, setConnected] = 
    useState(false);
  const [port, setPort] = 
    useState(null);

  return (
    <div className="min-h-screen 
      bg-gray-900 text-white p-4">
      <h1 className="text-3xl 
        font-bold text-center 
        text-teal-400">
        Smart DVT Monitor
      </h1>
    </div>
  );
}
