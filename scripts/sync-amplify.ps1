$APP_ID = "d1lrpaw08cl9k5"
$TMP_FILE = "$HOME\.amplify_env.json"

Write-Host "Reading local environment files..."

# Function to parse .env files safely
function Parse-EnvFile($filePath) {
    $envHash = @{}
    if (Test-Path $filePath) {
        Get-Content $filePath | Where-Object { $_ -match '^([^#]+?)=(.*)$' } | ForEach-Object {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove surrounding quotes if they exist
            if ($value -match '^"(.*)"$') {
                $value = $matches[1]
            } elseif ($value -match "^'(.*)'$") {
                $value = $matches[1]
            }
            
            $envHash[$key] = $value
        }
    }
    return $envHash
}

# Parse .env and .env.local
$env1 = Parse-EnvFile ".\.env"
$env2 = Parse-EnvFile ".\.env.local"

# Merge them (env.local overwrites .env)
$finalEnv = @{}
foreach ($key in $env1.Keys) { $finalEnv[$key] = $env1[$key] }
foreach ($key in $env2.Keys) { $finalEnv[$key] = $env2[$key] }

# Ensure we aren't uploading old Upstash Redis junk
$finalEnv.Remove("REDIS_URL")
$finalEnv.Remove("REDIS_TOKEN")
$finalEnv.Remove("UPSTASH_TOKEN")
$finalEnv.Remove("LOCAL_REDIS_URL")

# Force production URLs for NextAuth when deploying
$finalEnv["NEXTAUTH_URL"] = "https://glazyr.com"
$finalEnv["NEXT_PUBLIC_SITE_URL"] = "https://glazyr.com"

# Convert to JSON and save to a secure temporary file (UTF-8 No BOM for AWS CLI)
$jsonOutput = $finalEnv | ConvertTo-Json
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($TMP_FILE, $jsonOutput, $Utf8NoBomEncoding)

Write-Host "Synchronizing Environment Variables for Amplify App: $APP_ID..."

aws amplify update-app --app-id $APP_ID --environment-variables "file://$TMP_FILE"

if ($LASTEXITCODE -eq 0 -or $?) {
    Write-Host "AWS Amplify environment variables synced successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to sync to AWS Amplify. Check your AWS CLI permissions." -ForegroundColor Red
}

# Cleanup temporary file
if (Test-Path $TMP_FILE) { Remove-Item $TMP_FILE }
