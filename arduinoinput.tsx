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
