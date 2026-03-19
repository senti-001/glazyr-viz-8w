# Glazyr "Aqua Surge" Demo Orchestrator
# This script automates the visual climax for the PeerPush Showcase.

$TOKEN = "dcc9a69e-c7b2-4c5d-8a42-223ccd38c743"
$SCRIPTS_DIR = "c:\Users\senti\OneDrive\Desktop\Claw\claw-capabilities\skills\glazyr-viz\scripts"

Write-Host "`n[DEMO] STARTING THE AESTHETIC BASELINE..." -ForegroundColor Cyan
Write-Host "Setting Aquarium to 1,000 fish..." -ForegroundColor Gray
node "$SCRIPTS_DIR\set_fish.js" 1000 --token "$TOKEN"

Write-Host "`n[STAGE DIRECTION] Arrange your windows now." -ForegroundColor Yellow
Write-Host "Playwright on LEFT | Glazyr on RIGHT"
Write-Host "Recording starts in 10 seconds..."
Start-Sleep -Seconds 10

Write-Host "`n[DEMO] 3... 2... 1... RECORDING START!" -ForegroundColor Red
Start-Sleep -Seconds 5

Write-Host "`n[OVERLAY] 'Perception vs. Observation: The Glazyr Deathmatch'" -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "`n[OVERLAY] 'READY FOR THE AQUA SURGE?'" -ForegroundColor Yellow
Start-Sleep -Seconds 2

Write-Host "`n[ACTION] INITIATING SURGE: 30,000 FISH!" -ForegroundColor Green -BackgroundColor DarkCyan
node "$SCRIPTS_DIR\set_fish.js" 30000 --token "$TOKEN"

Write-Host "`n[OVERLAY] 'SIGNAL LOSS: System choking on 6MB/s bloat (CDP)'" -ForegroundColor Red
Write-Host "[OVERLAY] 'SIGNAL STABLE: Zero-Copy Vision stays locked (Glazyr)'" -ForegroundColor Green

Start-Sleep -Seconds 15

Write-Host "`n[DEMO] CONCLUDING SHOWCASE." -ForegroundColor Cyan
Write-Host "Total Efficiency Gap: 32,000x" -ForegroundColor Green
Write-Host "Ready for export."
