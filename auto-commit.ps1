$content = Get-Content CHANGELOG.md
$startIndex = ($content | Select-String '^### ').LineNumber[0]

# Get all lines after the first heading until the next heading or end
$commitMsg = @()
for ($i = $startIndex; $i -lt $content.Count; $i++) {
    if ($content[$i] -match '^### ') { break }
    $commitMsg += $content[$i]
}

$commitMsg = $commitMsg -join "`n"
git add .
git commit -m "$commitMsg"
