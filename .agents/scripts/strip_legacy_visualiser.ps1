## Removes legacy 2D canvas visualiser, Three.js inline visualiser, and
## Memory Palace blocks from app.js, leaving all other code intact.
## Run from the project root: powershell -File .agents\scripts\strip_legacy_visualiser.ps1

$src   = "C:\Personal\Dev\mnemosyne-dashboard\app.js"
$lines = [System.IO.File]::ReadAllLines($src)
$out   = [System.Collections.Generic.List[string]]::new()

# ── 0-based line index exclusion ranges (inclusive both ends) ─────────────────
#
# Ref: line numbers in viewer are 1-based, so subtract 1 for these ranges.
#
# [3,3]        line 4:   VISUALISER_MODE_KEY constant
# [25,29]      lines 26-30: CONSTELLATION_* constants + constellationScene state
# [317,317]    line 318: isCanvasVisualiserActive()
# [318,325]    lines 319-326: visualiserResponsiveFill()
# [336,350]    lines 337-351: updateVisualiserFullscreenButtons()
# [353,355]    lines 354-356: switchTab — stopCanvasVisualiserLoop / clearThreeScene / clearPalaceScene
# [377,379]    lines 378-380: switchTab — loadConstellation / loadThreeVisualiser / loadMemoryPalace
# [1169,1803]  lines 1170-1804: 2D canvas constellation section + loadConstellation
# [1938,2576]  lines 1939-2577: Three.js inline visualiser section
# [2578,3402]  lines 2579-3403: Memory Palace section (incl. closing blank line)
# [3403,3404]  lines 3404-3405: comment separator "// ── Memoria Tab …" kept? No, keep it.
#   Actually keep the blank + Memoria comment (3403-3404 are blank + comment for Memoria — keep them)
# [3555,3577]  lines 3556-3578: old visualiser event bindings

$excludeRanges = @(
    @(3,   3  ),  # VISUALISER_MODE_KEY
    @(25,  29 ),  # CONSTELLATION constants + constellationScene
    @(317, 317),  # isCanvasVisualiserActive
    @(318, 325),  # visualiserResponsiveFill
    @(336, 350),  # updateVisualiserFullscreenButtons
    @(353, 355),  # switchTab: stopCanvasVisualiserLoop / clearThreeScene / clearPalaceScene
    @(377, 379),  # switchTab: loadConstellation / loadThreeVisualiser / loadMemoryPalace
    @(1169,1803), # 2D constellation section
    @(1938,2576), # Three.js inline visualiser section
    @(2578,3402), # Memory Palace section
    @(3555,3577)  # old visualiser event bindings
)

for ($i = 0; $i -lt $lines.Count; $i++) {
    $skip = $false
    foreach ($r in $excludeRanges) {
        if ($i -ge $r[0] -and $i -le $r[1]) { $skip = $true; break }
    }
    if (-not $skip) { $out.Add($lines[$i]) }
}

[System.IO.File]::WriteAllLines($src, $out, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done."
Write-Host "  Lines removed : $($lines.Count - $out.Count)"
Write-Host "  Original total: $($lines.Count)"
Write-Host "  New total     : $($out.Count)"
