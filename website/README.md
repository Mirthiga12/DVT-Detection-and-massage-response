Smart DVT Monitor

A wearable smart knee band for Deep Vein 
Thrombosis (DVT) detection and treatment.

How It Works
Sensors on knee band read physiological 
data → Arduino sends to web dashboard → 
website classifies risk → vibration motor 
activates automatically

Hardware Components
- Arduino Uno
- FSR Sensor (pressure/swelling) → A0
- MAX30102 PPG (SpO2 + Heart Rate) → A4/A5
- MPU6050 IMU (acceleration) → A4/A5
- HW-123 Coin Vibration Motor → D9

Risk Classification
Score 0-3   → NORMAL    → Motor OFF
Score 4-8   → MODERATE  → Motor PWM150
Score 9+    → HIGH RISK → Motor PWM255

Risk Thresholds
- FSR >= 600 → High swelling
- SpO2 <= 89% → Low oxygen
- HR > 100 BPM → High heart rate

How to Run
1. Upload arduino/dvt_monitor.ino 
   to Arduino Uno
2. Open website in Chrome browser
3. Click Connect Arduino button
4. Select COM port
5. Live sensor data flows!

Tech Stack
- Arduino C++
- React + Tailwind CSS
- Web Serial API
- Chart.js

Team
- Team Name: VenoGuard
- Hackathon: NIC SRM Hackforge 26
