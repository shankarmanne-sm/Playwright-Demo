# Run Playwright tests and create per-spec result folders in test-results
# Usage: .\scripts\run-and-record.ps1 [<playwright-args>]

Param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [String[]]$PlaywrightArgs
)

$ErrorActionPreference = 'Stop'

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $workspace

if (-not (Test-Path "test-results")) { New-Item -ItemType Directory -Path "test-results" | Out-Null }

$tempReport = Join-Path $workspace "test-results\playwright-report.json"
if (Test-Path $tempReport) { Remove-Item $tempReport -Force }

Write-Output "Running: npx playwright test $($PlaywrightArgs -join ' ') --reporter=json"
$cmd = "npx playwright test $($PlaywrightArgs -join ' ') --reporter=json"
# Run and capture JSON output
$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = 'cmd.exe'
$processInfo.Arguments = "/c $cmd > `"$tempReport`" && exit $LASTEXITCODE"
$processInfo.RedirectStandardOutput = $false
$processInfo.UseShellExecute = $true
$proc = [System.Diagnostics.Process]::Start($processInfo)
$proc.WaitForExit()
$exitCode = $proc.ExitCode

if (-not (Test-Path $tempReport)) {
    Write-Error "Playwright JSON report not found at $tempReport"
    exit $exitCode
}

# Parse JSON
$json = Get-Content $tempReport -Raw | ConvertFrom-Json

function Get-TestsFromSuite($suite) {
    $results = @()
    if ($null -ne $suite.tests) {
        foreach ($t in $suite.tests) {
            $results += [PSCustomObject]@{
                Title = $t.title -join ' ';
                File = $t.file;
                Status = $t.status;
                Duration = $t.duration
            }
        }
    }
    if ($null -ne $suite.suites) {
        foreach ($s in $suite.suites) {
            $results += Get-TestsFromSuite $s
        }
    }
    return $results
}

$allTests = @()
if ($null -ne $json.suites) {
    foreach ($s in $json.suites) {
        $allTests += Get-TestsFromSuite $s
    }
}

if ($allTests.Count -eq 0) {
    Write-Output "No tests found in report."
} else {
    foreach ($t in $allTests) {
        # sanitize filename
        $spec = Split-Path $t.File -Leaf
        if (-not $spec) { $spec = 'unknown.spec' }
        $specDir = Join-Path $workspace ("test-results\$spec")
        if (-not (Test-Path $specDir)) { New-Item -ItemType Directory -Path $specDir | Out-Null }

        $statusFile = Join-Path $specDir ("$spec - $($t.Status).txt")
        $content = @()
        $content += "status: $($t.Status)"
        $content += "title: $($t.Title)"
        $content += "file: $($t.File)"
        if ($t.Duration -ne $null) { $content += "duration_ms: $($t.Duration)" }
        Set-Content -Path $statusFile -Value $content

        # copy overall last-run.json for reference
        if (Test-Path (Join-Path $workspace 'test-results\.last-run.json')) {
            Copy-Item -Force -Path (Join-Path $workspace 'test-results\.last-run.json') -Destination (Join-Path $specDir 'summary.last-run.json')
        }
    }
    Write-Output "Wrote per-spec status files for $($allTests.Count) tests."
}

exit $exitCode
