$APP_ID = "d1lrpaw08cl9k5"
$TMP_FILE = "$HOME\.amplify_env.json"

# Glazyr Viz V1.0.0 Production Env Sync
$ENV_VARS = @{
    "NEXTAUTH_URL"          = "https://glazyr.com"
    "NEXT_PUBLIC_SITE_URL"  = "https://glazyr.com"
    "NEXTAUTH_SECRET"       = "0e9b50546e92cd80da5b29a1ba259d8ade6dcfc48440133f516e773c6de3ce6e0"
    "GITHUB_ID"             = "Ov23liblPiRZwoSfB8c4"
    "GITHUB_SECRET"         = "1955ce27ea94363c81cd102314e496c92e5a6339"
    "GOOGLE_ID"             = "1023229815857-rspo2a77ta7c67astlg0lkkrodtdvche.apps.googleusercontent.com"
    "GOOGLE_SECRET"         = "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"
    "REDIS_URL"             = "https://big-oyster-39155.upstash.io"
    "REDIS_TOKEN"           = "AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU"
    "STRIPE_SECRET_KEY"     = "PLACE_HOLDER"
    "STRIPE_WEBHOOK_SECRET" = "PLACE_HOLDER"
}

# Convert to JSON and save to file
$ENV_VARS | ConvertTo-Json | Out-File -FilePath $TMP_FILE -Encoding utf8

Write-Host "Synchronizing Environment Variables for Amplify App: $APP_ID..."

# Use the file in the AWS command
aws amplify update-app --app-id $APP_ID --environment-variables "file://$TMP_FILE"

# Cleanup
if (Test-Path $TMP_FILE) { Remove-Item $TMP_FILE }

Write-Host "V1.0.0 Production Environment Synced Successfully."
