import serial
from ast import literal_eval  
# ser= serial.Serial('/dev/ttyUSB1' ,9600)
import serial
import json

ser = serial.Serial(port = "/dev/ttyUSB1", baudrate=9600,
                           bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE)
# print("heloooooooo")
# print(ser)
while True:
    try:
        data = ser.readline()
        #print(data)
        main = str(list(data))
        dec = literal_eval(main)
        #ray=dec.readline()
        #print("dec",dec)
        lenth = (len(dec))
        #print("hhhhhhhhhhhhhhhhhhhh",lenth)
       
        if lenth>0:
           # print("hgiugh")
            # print(f"sys: {dec[14:15]}, dia: {dec[16:17]},Pulse/min: {dec[18:19]}")
            #print(f"sys: {dec[14]}, dia: {dec[16]}")
            # print(f"sys: {{{dec[14]}}}, dia: {{{dec[16]}}}")
            # print(f"sys: {dec[14]}, dia: {dec[16]}, pulse: {dec[18]}")

            data = {
                         "sys"  :   dec[12],
                        "dia": dec[14]
                    }

                    # Convert the dictionary to a JSON string
            json_data = json.dumps(data)
            print (json_data)
    except KeyboardInterrupt:
        ser.close()
        print("\nSerial Closed! ")
        break

    except Exception as e:
        print(e)
        pass

