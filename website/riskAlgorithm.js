// DVT Risk Scoring Algorithm
// Based on Kaggle DVT Dataset Analysis

export function calculateRisk(fsr, hr, spo2, accel, motion) {
  let score = 0;

  // FSR Score (Swelling/Pressure)
  if (fsr >= 600) score += 4;
  else if (fsr >= 500) score += 2;

  // SpO2 Score (Oxygen Level)
  if (spo2 <= 89) score += 4;
  else if (spo2 <= 91) score += 2;

  // Heart Rate Score
  if (hr > 100) score += 3;
  else if (hr >= 90) score += 1;

  // Acceleration Score
  if (accel < 9.0 || accel > 10.0) score += 1;

  // No Motion + High Pressure = Extra Risk
  if (motion === 0 && fsr >= 600) score += 1;

  // Risk Classification
  if (score >= 9) {
    return { score, level: "HIGH RISK" };
  } else if (score >= 4) {
    return { score, level: "MODERATE" };
  } else {
    return { score, level: "NORMAL" };
  }
}

// Motor Command based on Risk
export function getMotorCommand(level) {
  if (level === "HIGH RISK") return "MOTOR:HIGH";
  if (level === "MODERATE") return "MOTOR:MEDIUM";
  return "MOTOR:OFF";
}
