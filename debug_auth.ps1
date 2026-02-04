
try {
    $body = @{
        email = "debug_user_v2@ankris.com"
        password = "password123"
        username = "debuguser"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://ankris-backend.onrender.com/api/auth/register" -Method Post -Body $body -ContentType "application/json"
    Write-Host "Success:"
    Write-Host ($response | ConvertTo-Json -Depth 5)
} catch {
    Write-Host "Error Status: $($_.Exception.Response.StatusCode)"
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $responseBody = $reader.ReadToEnd()
    Write-Host "Error Body: $responseBody"
}
