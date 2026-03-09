export async function connectSerial(onDataReceived) {
  try {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    const decoder = new TextDecoderStream();
    port.readable.pipeTo(decoder.writable);
    const reader = decoder.readable.getReader();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      buffer += value;
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (line.trim().startsWith("FSR:")) {
          onDataReceived(line.trim());
        }
      }
    }
    return port;

  } catch (err) {
    console.error("Serial connection error:", err);
  }
}
export function parseSensorData(line) {
  const parts = line.split(",");
  const data = {};
  
  parts.forEach(part => {
    const [key, value] = part.split(":");
    data[key] = parseFloat(value);
  });

  return {
    fsr: data.FSR || 0,
    hr: data.HR || 0,
    spo2: data.SPO2 || 0,
    accel: data.ACCEL || 0,
    motion: data.MOTION || 0
  };
}


export async function sendMotorCommand(port, command) {
  try {
    const writer = port.writable.getWriter();
    await writer.write(
      new TextEncoder().encode(command + "\n")
    );
    writer.releaseLock();
  } catch (err) {
    console.error("Motor command error:", err);
  }
}
