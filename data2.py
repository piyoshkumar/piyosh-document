import serial
import os
import time
ser = serial.Serial('/dev/ttyS0', 115200)
def send_data(data):
    # Send the provided data to the serial port
    ser.write(data.encode('utf-8'))
    #time.sleep(1)
    #ser.flush()
    data="Thank You"
    ser.write(data.encode('utf-8'))
while True:
        try:
            time.sleep(0.01)
            data = ser.readline().decode('utf-8').strip()
            print(data)
            #print("\n")
            if os.path.isfile('/home/pi/sms.txt'):
            # Read the content of the file into a variable
                with open('/home/pi/sms.txt', 'r') as file:
                    data_from_file = file.read()
                    send_data(data_from_file)
                     # Delete the file
                    os.remove('/home/pi/sms.txt')
            if os.path.isfile('/home/pi/net.txt'):
             # Read the content of the file into a variable
                 with open('/home/pi/net.txt', 'r') as file:
                     data_from_file = file.read()
                     send_data(data_from_file)
                      # Delete the file
                     os.remove('/home/pi/net.txt')
        except Exception as e:
            print(e)
