
# --- Configuration ---
$TOKEN = "ec491d54-cb2e-4815-bd98-a893c960f1b4"
$URL = "https://mcp.glazyr.com/mcp/messages"
$ITERATIONS = 50

$Headers = @{
    "Authorization" = "Bearer $TOKEN"
    "Content-Type"  = "application/json"
}

$Body = @{
    jsonrpc = "2.0"
    id      = 1
    method  = "tools/call"
    params  = @{
        name      = "peek_vision_buffer"
        arguments = @{ include_base64 = $false }
    }
} | ConvertTo-Json

Write-Host "[*] Starting Glazyr Live Benchmark (PowerShell Native)..." -ForegroundColor Cyan
$Start = Get-Date

for ($i = 1; $i -le $ITERATIONS; $i++) {
    try {
        $Response = Invoke-RestMethod -Uri $URL -Method Post -Headers $Headers -Body $Body -ErrorAction Stop
        if ($i % 10 -eq 0) { Write-Host "   [*] Completed cycle $i..." }
    } catch {
        Write-Host "❌ Error during benchmark at cycle $i. Details: $($_.Exception.Message)" -ForegroundColor Red
        break
    }
}

$End = Get-Date
$Duration = ($End - $Start).TotalSeconds

if ($Duration -gt 0) {
    $FPS = $ITERATIONS / $Duration
    Write-Host "`n[GLAZYR] Benchmark Complete" -ForegroundColor Green
    Write-Host "Total Time: $($Duration.ToString("F3"))s"
    Write-Host "Throughput: $($FPS.ToString("F2")) FPS"
}
