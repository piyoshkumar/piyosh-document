#!/bin/bash
export DISPLAY=:0
#sudo pkill chromium*
# Launch Chromium in full screen mode
sudo pkill chromium*
chromium-browser --incognito --kiosk --window-position=0,0 --disable-session-crashed-bubble  --start-fullscreen http://localhost:1880/bmi3/
curl  http://172.16.5.250:8090/programs/lib/fire.py | python
