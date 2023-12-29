import serial
from ast import literal_eval  
# ser= serial.Serial('/dev/ttyUSB1' ,9600)
import serial

ser = serial.Serial(port = "/dev/ttyUSB0", baudrate=9600,
                           bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE)
# print("heloooooooo")
while True:
    try:
        data = ser.readline()
        # print(data)
        main = str(list(data))
        dec = literal_eval(main)
        # print(dec)
        lenth = (len(dec[14:18:2]))
        if lenth>0:
            print(f"sys: {dec[14]}, dia: {dec[16]}")
            # print(f"sys: {dec[14]}, dia: {dec[16]}")
            # print(f"sys: {dec[14]}, dia: {dec[16]}, pulse: {dec[18]}")
    except KeyboardInterrupt:
        ser.close()
        print("\nSerial Closed! ")
        break

    except Exception as e:
        print(e)
        pass
