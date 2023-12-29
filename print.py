import serial
import sys

# Define the serial port and baud rate
ser = serial.Serial('/dev/ttyUSB0', 115200)

def send_data(data):
    # Send the provided data to the serial port
    ser.write(data.encode('utf-8'))
    ser.flush()

if __name__ == '__main__':
    # Check if a command-line argument (data) was provided
    if len(sys.argv) < 2:
        print("Usage: python script.py [data]")
        sys.exit(1)

    # Get the data from the command-line argument
    #data_to_send = sys.argv[1]
    data_to_send = ' '.join(sys.argv[1:])
    # Call the send_data function to send the data
    send_data(data_to_send)

    # Close the serial port
    #ser.close()
