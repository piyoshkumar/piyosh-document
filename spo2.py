import serial
import json
ser = serial.Serial('/dev/ttyUSB0', 115200)
#print("{'SPO2':99, 'PR': 82}")

while True:
    try:
        # Read data from the serial port and decode it using UTF-8
        data = ser.readline().decode('utf-8')
        data_ch = data.replace("'", "\"")
        #json_obj = json.loads(data_ch)
        #data=json.dumps(data)
        print(data_ch)
        # Write data to a file
        #with open('/home/pi/lysun.txt', 'a') as file:
            #file.write(data)

    except KeyboardInterrupt:
        ser.close()
        print("\nSerial Closed!")
        break

    except Exception as e:
        print(e)
        pass


