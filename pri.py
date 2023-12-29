import serial

# Define the command to cut the paper
cut_command = b'\x1Bd0C'

# Open a serial connection to the printer
ser = serial.Serial('/dev/ttyUSB3', 115200)  # Replace 'COMx' with your printer's COM port

# Send the cut command to the printer
ser.write(cut_command)

# Close the serial connection
ser.close()
