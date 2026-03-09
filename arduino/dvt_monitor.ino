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
