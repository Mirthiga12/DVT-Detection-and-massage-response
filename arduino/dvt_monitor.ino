// DVT Smart Monitor
// Libraries
#include <Wire.h>
#include "MPU6050.h"

// Pin Definitions
#define MOTOR_PIN 9
#define FSR_PIN A0

// Objects
MPU6050 mpu;
// Variables
int16_t ax, ay, az;
float accelMag, prevAccel = 0;
int motion = 0;

// Setup Function
void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN, OUTPUT);
  analogWrite(MOTOR_PIN, 0);
  Wire.begin();
  mpu.initialize();
  Serial.println(F("OK"));
}
// Main Loop
void loop() {
  // Read FSR sensor
  int fsrValue = analogRead(FSR_PIN);
  
  // Read MPU6050 acceleration
  mpu.getAcceleration(&ax, &ay, &az);
  accelMag = sqrt(
    (ax/16384.0)*(ax/16384.0)+
    (ay/16384.0)*(ay/16384.0)+
    (az/16384.0)*(az/16384.0)
  );
  
  // Detect motion
  motion = (abs(accelMag - prevAccel) > 0.3) ? 1 : 0;
  prevAccel = accelMag;
  
  // Send data to website
  Serial.print(F("FSR:")); 
  Serial.print(fsrValue);
  Serial.print(F(",HR:75,SPO2:96"));
  Serial.print(F(",ACCEL:")); 
  Serial.print(accelMag, 2);
  Serial.print(F(",MOTION:")); 
  Serial.println(motion);
  
  delay(500);
}
// Receive motor commands from website
  if (Serial.available() > 0) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    
    if (cmd == "MOTOR:OFF") {
      analogWrite(MOTOR_PIN, 0);
    }
    else if (cmd == "MOTOR:MEDIUM") {
      analogWrite(MOTOR_PIN, 150);
    }
    else if (cmd == "MOTOR:HIGH") {
      analogWrite(MOTOR_PIN, 255);
    }
  }
