#include <Wire.h>
#include "MPU6050.h"
#define MOTOR_PIN 9
#define FSR_PIN A0
MPU6050 mpu;
int16_t ax, ay, az;
float accelMag, prevAccel = 0;
int motion = 0;
void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN, OUTPUT);
  analogWrite(MOTOR_PIN, 0);
  Wire.begin();
  mpu.initialize();
  Serial.println(F("OK"));
}
void loop() {
  int fsrValue = analogRead(FSR_PIN);
  mpu.getAcceleration(&ax, &ay, &az);
  accelMag = sqrt(
    (ax/16384.0)*(ax/16384.0)+
    (ay/16384.0)*(ay/16384.0)+
    (az/16384.0)*(az/16384.0)
  );
  motion = (abs(accelMag - prevAccel) 
  > 0.3) ? 1 : 0;
  prevAccel = accelMag;
  Serial.print(F("FSR:")); 
  Serial.print(fsrValue);
  Serial.print(F(",HR:75,SPO2:96"));
  Serial.print(F(",ACCEL:")); 
  Serial.print(accelMag, 2);
  Serial.print(F(",MOTION:")); 
  Serial.println(motion);
  if (Serial.available() > 0) {
    String cmd = 
    Serial.readStringUntil('\n');
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
  delay(500);
}
