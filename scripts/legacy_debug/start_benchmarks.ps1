# Glazyr "Battle of the Vision Bridges" Launcher
# Usage: .\start_benchmarks.ps1

$CDP_PATH = "c:\Users\senti\OneDrive\Desktop\websites\glazyr-viz-8w\cdp_bloat_demo.js"
$GLAZYR_PATH = "c:\Users\senti\OneDrive\Desktop\Claw\claw-capabilities\skills\glazyr-viz\scripts\glazyr_status_loop.js"
$TOKEN = "dcc9a69e-c7b2-4c5d-8a42-223ccd38c743"

Write-Host "`n[DEMO] LAUNCHING THE BATTLE..." -ForegroundColor Cyan
Write-Host "1. Opening CDP Bloat Terminal (Playwright)"
Write-Host "2. Opening Glazyr Pulse Terminal (Zero-Copy DMA)" -ForegroundColor Green
Write-Host "`nArraging windows side-by-side for recording is recommended.`n"

# Launch CDP Terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node $CDP_PATH"

# Launch Glazyr Terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\senti\OneDrive\Desktop\Claw\claw-capabilities\skills\glazyr-viz\scripts; node glazyr_status_loop.js --token $TOKEN"

# Force Optic Nerve Attachment (with retry loop)
# Note: Navigation is handled by the initial 'super_reset_v2.py' ignition to prevent 502 overhead.
Write-Host "[GLAZYR] Waiting for Zero-Copy Buffer Sync (15s)..." -ForegroundColor Gray
Start-Sleep -Seconds 15

$maxRetries = 3
$retryCount = 0
$success = $false
$DEMO_URL = "https://webglsamples.org/aquarium/aquarium.html?numFish=100"

while ($retryCount -lt $maxRetries -and -not $success) {
    $retryCount++
    Write-Host "[GLAZYR] Finalizing Optic Nerve Attachment (Attempt $retryCount/3)..." -ForegroundColor Gray
    try {
        $valResult = node c:\Users\senti\OneDrive\Desktop\Claw\claw-capabilities\skills\glazyr-viz\scripts\validate_vision.js "$DEMO_URL" --token "$TOKEN" 2>&1
        if ($valResult -like "*ACTIVE*" -or $valResult -like "*Success*") {
            $success = $true
            Write-Host "✅ Optic Nerve Attached!" -ForegroundColor Green
        } elseif ($valResult -like "*502*") {
            Write-Host "⚠️ Gateway Timeout (502). The node is under heavy load. Waiting before retry..." -ForegroundColor Yellow
            Start-Sleep -Seconds 10
        } else {
            Write-Host "   IDLE reported. Warming up..." -ForegroundColor Gray
            Start-Sleep -Seconds 5
        }
    } catch {
        Write-Host "❌ Attachment failed. Retrying..." -ForegroundColor Red
        Start-Sleep -Seconds 5
    }
}

if (-not $success) {
    Write-Host "`n[WARNING] Optic Nerve stayed IDLE. Metrics should still switch manually." -ForegroundColor Yellow
    Write-Host "Wait for terminal metrics to flip from 'Status' to 'Engine' before recording." -ForegroundColor Cyan
} else {
    Write-Host "`nDemo Cued. Glazyr Pulse Activated (0 MB Transfer)." -ForegroundColor Yellow
    Write-Host "Wait for metrics to switch from 'Status' to 'Engine' before recording." -ForegroundColor Cyan
}
