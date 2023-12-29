import serial
ser = serial.Serial('/dev/ttyS0', 115200)
while True:
        try:
            data = ser.readline().decode('utf-8').strip()
            print(data)
        except Exception as e:
            print(e)
