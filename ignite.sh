#!/bin/bash
export DISPLAY=:99
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
sleep 2

echo "[*] Launching headless_shell..."
nohup /home/senti/chromium/src/out/NeuralRelease/headless_shell   --headless   --no-sandbox   --remote-debugging-port=9222   --window-size=400,300   --disable-gpu-vsync   --disable-frame-rate-limit   --enable-gpu-rasterization   --ignore-gpu-blocklist   --disable-background-timer-throttling   --disable-renderer-backgrounding   --disable-backgrounding-occluded-windows   "https://webglsamples.org/aquarium/aquarium.html?numFish=1000" </dev/null >/tmp/chrome_run.log 2>&1 &

sleep 15
python3 /tmp/wake_chrome.py
sleep 15

echo "[*] Launching redis_buffer..."
nohup python3 /home/senti/chromium/src/glazyr/redis_buffer_final.py </dev/null >/tmp/redis_run.log 2>&1 &
disown

echo "[+] Surge Core Operational."
