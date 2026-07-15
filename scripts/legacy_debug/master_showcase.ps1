# Glazyr "Sovereign Audit" v19 (Fixed Pipeline)
# Uses V7.0 SCP Ignition + V4.0 Bridge

$TOKEN = "dcc9a69e-c7b2-4c5d-8a42-223ccd38c743"
$CLAW_DIR = "c:\Users\senti\OneDrive\Desktop\Claw"
$WEBSITE_DIR = "c:\Users\senti\OneDrive\Desktop\websites\glazyr-viz-8w"
$SCRIPTS_DIR = "$CLAW_DIR\claw-capabilities\skills\glazyr-viz\scripts"
$UPSTASH_BASE = "https://big-oyster-39155.upstash.io"
$TOKEN_PARAM = "_token=AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU"

function Get-Engine-FPS {
    try {
        $resp = Invoke-RestMethod "$UPSTASH_BASE/get/glazyr:viz:latest_telemetry?$TOKEN_PARAM" -ErrorAction SilentlyContinue
        $data = $resp.result | ConvertFrom-Json
        return [float]$data.fps
    } catch {
        return 0.0
    }
}

Write-Host "`n[SOVEREIGN] COMMENCING VIZ5 AUDIT (V19)..." -ForegroundColor Cyan

# 1. Check if engine is already active (FAST-PATH)
$currentFPS = Get-Engine-FPS
if ($currentFPS -gt 1.0) {
    Write-Host "[FAST-PATH] Engine already pulsing at $currentFPS FPS. Skipping ignition." -ForegroundColor Green
} else {
    Write-Host "[IGNITE] No active engine. Running V7.0 ignition..." -ForegroundColor Yellow
    python "$CLAW_DIR\super_reset_v2.py"
    
    # Wait for engine to come online (up to 30s after ignition)
    Write-Host "[WAIT] Waiting for engine to report FPS..." -ForegroundColor Gray
    for ($i = 0; $i -lt 30; $i++) {
        $fps = Get-Engine-FPS
        if ($fps -gt 1.0) {
            Write-Host "[OK] Engine active at $fps FPS." -ForegroundColor Green
            break
        }
        Start-Sleep -Seconds 2
    }
}

# 2. Start Status Terminals
$pGlazyr = Start-Process powershell -WindowStyle Normal -WorkingDirectory $SCRIPTS_DIR -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = '[GLAZYR_SHM]'; node glazyr_status_loop.js --token $TOKEN" -PassThru
$pCDP = Start-Process powershell -WindowStyle Normal -WorkingDirectory $WEBSITE_DIR -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = '[TRADITIONAL_CDP]'; node PLAYWRIGHT_BLOAT_TEST.js" -PassThru

# 3. Let it warm up
Write-Host "[WAIT] Deep Iron Asset Loading (30s)..." -ForegroundColor Gray
Start-Sleep -Seconds 30

# 4. INITIAL PULSE
node "$SCRIPTS_DIR\set_fish.js" 1 --token "$TOKEN" > $null 2>&1
Start-Sleep -Seconds 10
node "$SCRIPTS_DIR\red_shift_trigger.js" --token "$TOKEN" > $null 2>&1
Start-Sleep -Seconds 10

# 5. SURGE CLIMAX
Write-Host "`n[FIRE] DEPLOYING KILL-STUTTER (30,000 FISH)." -ForegroundColor Red
node "$SCRIPTS_DIR\set_fish.js" 30000 --token "$TOKEN" > $null 2>&1
Start-Sleep -Seconds 25

# 6. NUCLEAR EXIT
Write-Host "`n[DONE] AUDIT CONCLUDED." -ForegroundColor Green
Start-Sleep -Seconds 2
Stop-Process -Id $pGlazyr.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $pCDP.Id -Force -ErrorAction SilentlyContinue
Get-Process node | Where-Object { $_.Path -like "*glazyr_status*" -or $_.Path -like "*BLOAT_TEST*" } | Stop-Process -Force -ErrorAction SilentlyContinue
