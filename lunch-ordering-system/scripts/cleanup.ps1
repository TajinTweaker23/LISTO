# 🧹 Lunch Ordering System - Cleanup Script
# This script removes the lunch ordering system components
# Does NOT affect LISTO Medical App - operates independently

param(
    [Parameter(Mandatory=$true)]
    [string]$SharePointSiteUrl,
    
    [Parameter(Mandatory=$false)]
    [switch]$RemoveLists = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$RemoveFiles = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$RemoveFlows = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$RemovePages = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$RemoveAll = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$WhatIf = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Confirm = $true
)

# Set up logging
$LogFile = "cleanup-log-$(Get-Date -Format 'yyyy-MM-dd-HH-mm-ss').txt"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry -ForegroundColor $(if($Level -eq "ERROR"){"Red"} elseif($Level -eq "WARN"){"Yellow"} else {"Green"})
    Add-Content -Path $LogFile -Value $LogEntry
}

function Confirm-Action {
    param([string]$Action)
    
    if (-not $Confirm) {
        return $true
    }
    
    $Response = Read-Host "Are you sure you want to $Action ? (yes/no)"
    return ($Response -eq "yes" -or $Response -eq "y")
}

function Remove-SharePointLists {
    Write-Log "🗂️  Removing SharePoint Lists..."
    
    if (-not (Confirm-Action "remove all SharePoint lists")) {
        Write-Log "⏭️  Skipped SharePoint list removal"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove 4 SharePoint lists" "WARN"
        return
    }
    
    try {
        Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
        
        $ListsToRemove = @("LunchVoting", "LunchOrders", "LunchSessions", "RestaurantMaster")
        
        foreach ($ListName in $ListsToRemove) {
            try {
                $List = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue
                if ($List) {
                    Remove-PnPList -Identity $ListName -Force
                    Write-Log "✅ Removed list: $ListName"
                } else {
                    Write-Log "⚠️  List not found: $ListName" "WARN"
                }
            } catch {
                Write-Log "❌ Failed to remove list $ListName`: $($_.Exception.Message)" "ERROR"
            }
        }
        
        Disconnect-PnPOnline
        Write-Log "✅ SharePoint lists cleanup completed"
        
    } catch {
        Write-Log "❌ SharePoint lists cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Remove-SiteAssets {
    Write-Log "📁 Removing Site Assets files..."
    
    if (-not (Confirm-Action "remove dashboard files from Site Assets")) {
        Write-Log "⏭️  Skipped Site Assets file removal"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove CSS/JS files from Site Assets" "WARN"
        return
    }
    
    try {
        Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
        
        $FilesToRemove = @("styles.css", "scripts.js")
        
        foreach ($FileName in $FilesToRemove) {
            try {
                $File = Get-PnPFile -Url "/SiteAssets/$FileName" -ErrorAction SilentlyContinue
                if ($File) {
                    Remove-PnPFile -ServerRelativeUrl "/SiteAssets/$FileName" -Force
                    Write-Log "✅ Removed file: $FileName"
                } else {
                    Write-Log "⚠️  File not found: $FileName" "WARN"
                }
            } catch {
                Write-Log "❌ Failed to remove file $FileName`: $($_.Exception.Message)" "ERROR"
            }
        }
        
        Disconnect-PnPOnline
        Write-Log "✅ Site Assets cleanup completed"
        
    } catch {
        Write-Log "❌ Site Assets cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Remove-PowerAutomateFlows {
    Write-Log "⚡ Power Automate flows cleanup..."
    
    if (-not (Confirm-Action "remove Power Automate flows")) {
        Write-Log "⏭️  Skipped Power Automate flows removal"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove 3 Power Automate flows" "WARN"
        return
    }
    
    try {
        # Note: Power Automate flow removal requires manual action or Graph API calls
        Write-Log "📝 Manual step required: Remove Power Automate flows" "WARN"
        Write-Log "   1. Go to https://flow.microsoft.com"
        Write-Log "   2. Go to 'My flows'"
        Write-Log "   3. Find and delete these flows:"
        Write-Log "      - Lunch Voting Automation"
        Write-Log "      - Order Collection Automation"
        Write-Log "      - Lunch Notification System"
        Write-Log "   4. Confirm deletion for each flow"
        
        Write-Log "✅ Power Automate flows cleanup instructions provided"
        
    } catch {
        Write-Log "❌ Power Automate flows cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Remove-SharePointPages {
    Write-Log "📄 Removing SharePoint pages..."
    
    if (-not (Confirm-Action "remove lunch dashboard pages")) {
        Write-Log "⏭️  Skipped SharePoint pages removal"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove dashboard pages" "WARN"
        return
    }
    
    try {
        Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
        
        $PagesToRemove = @("Lunch-Dashboard", "Lunch Dashboard", "LunchDashboard")
        
        foreach ($PageName in $PagesToRemove) {
            try {
                $Page = Get-PnPPage -Identity $PageName -ErrorAction SilentlyContinue
                if ($Page) {
                    Remove-PnPPage -Identity $PageName -Force
                    Write-Log "✅ Removed page: $PageName"
                } else {
                    Write-Log "⚠️  Page not found: $PageName" "WARN"
                }
            } catch {
                Write-Log "❌ Failed to remove page $PageName`: $($_.Exception.Message)" "ERROR"
            }
        }
        
        Disconnect-PnPOnline
        Write-Log "✅ SharePoint pages cleanup completed"
        
    } catch {
        Write-Log "❌ SharePoint pages cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Remove-MicrosoftForms {
    Write-Log "📝 Microsoft Forms cleanup..."
    
    if (-not (Confirm-Action "remove Microsoft Forms")) {
        Write-Log "⏭️  Skipped Microsoft Forms removal"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove lunch ordering forms" "WARN"
        return
    }
    
    try {
        # Note: Microsoft Forms don't have a PowerShell API for deletion
        Write-Log "📝 Manual step required: Remove Microsoft Forms" "WARN"
        Write-Log "   1. Go to https://forms.office.com"
        Write-Log "   2. Find lunch ordering forms:"
        Write-Log "      - Restaurant Voting Form"
        Write-Log "      - Lunch Order Collection Form"
        Write-Log "   3. Delete each form"
        Write-Log "   4. Empty the recycle bin if desired"
        
        Write-Log "✅ Microsoft Forms cleanup instructions provided"
        
    } catch {
        Write-Log "❌ Microsoft Forms cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Clean-LocalFiles {
    Write-Log "🧹 Cleaning up local deployment files..."
    
    if (-not (Confirm-Action "remove local deployment artifacts")) {
        Write-Log "⏭️  Skipped local file cleanup"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would remove local deployment files" "WARN"
        return
    }
    
    try {
        $FilesToRemove = @(
            "dashboard-modified.html",
            "deployment-log-*.txt"
        )
        
        foreach ($FilePattern in $FilesToRemove) {
            $Files = Get-ChildItem -Path $ScriptDir -Name $FilePattern -ErrorAction SilentlyContinue
            foreach ($File in $Files) {
                $FilePath = Join-Path $ScriptDir $File
                if (Test-Path $FilePath) {
                    Remove-Item $FilePath -Force
                    Write-Log "✅ Removed local file: $File"
                }
            }
        }
        
        Write-Log "✅ Local files cleanup completed"
        
    } catch {
        Write-Log "❌ Local files cleanup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Show-CleanupSummary {
    Write-Log ""
    Write-Log "🧹 CLEANUP COMPLETED!" -Level "SUCCESS"
    Write-Log ""
    Write-Log "✅ REMOVED COMPONENTS:"
    
    if ($RemoveLists -or $RemoveAll) {
        Write-Log "- SharePoint Lists (LunchVoting, LunchOrders, LunchSessions, RestaurantMaster)"
    }
    
    if ($RemoveFiles -or $RemoveAll) {
        Write-Log "- Site Assets files (styles.css, scripts.js)"
    }
    
    if ($RemovePages -or $RemoveAll) {
        Write-Log "- SharePoint dashboard pages"
    }
    
    if ($RemoveFlows -or $RemoveAll) {
        Write-Log "- Power Automate flows (manual steps required)"
    }
    
    Write-Log "- Microsoft Forms (manual steps required)"
    Write-Log "- Local deployment files"
    Write-Log ""
    Write-Log "📝 MANUAL STEPS STILL REQUIRED:"
    Write-Log "1. Delete Power Automate flows from flow.microsoft.com"
    Write-Log "2. Delete Microsoft Forms from forms.office.com"
    Write-Log "3. Empty SharePoint recycle bin if desired"
    Write-Log ""
    Write-Log "⚠️  IMPORTANT: LISTO Medical App remains completely unaffected"
    Write-Log ""
    Write-Log "📄 Cleanup log saved to: $LogFile"
    Write-Log ""
}

# Validate parameters
if ($RemoveAll) {
    $RemoveLists = $true
    $RemoveFiles = $true
    $RemoveFlows = $true
    $RemovePages = $true
}

if (-not ($RemoveLists -or $RemoveFiles -or $RemoveFlows -or $RemovePages)) {
    Write-Host "No cleanup actions specified. Use one or more of the following parameters:" -ForegroundColor Yellow
    Write-Host "  -RemoveLists   : Remove SharePoint lists" -ForegroundColor White
    Write-Host "  -RemoveFiles   : Remove Site Assets files" -ForegroundColor White
    Write-Host "  -RemoveFlows   : Remove Power Automate flows" -ForegroundColor White
    Write-Host "  -RemovePages   : Remove SharePoint pages" -ForegroundColor White
    Write-Host "  -RemoveAll     : Remove everything" -ForegroundColor White
    Write-Host ""
    Write-Host "Example: .\cleanup.ps1 -SharePointSiteUrl 'https://tenant.sharepoint.com/sites/site' -RemoveAll" -ForegroundColor Green
    exit 1
}

# Main cleanup execution
try {
    Write-Log "🧹 Starting Lunch Ordering System cleanup..."
    Write-Log "📍 Target Site: $SharePointSiteUrl"
    if ($WhatIf) { Write-Log "🔍 WHAT-IF MODE: No changes will be made" "WARN" }
    Write-Log ""
    
    # Confirm dangerous operation
    if ($RemoveAll -and $Confirm) {
        Write-Host "⚠️  WARNING: This will remove ALL lunch ordering system components!" -ForegroundColor Red
        Write-Host "This includes:" -ForegroundColor Yellow
        Write-Host "  - All SharePoint lists and their data" -ForegroundColor White
        Write-Host "  - Dashboard files and pages" -ForegroundColor White
        Write-Host "  - Power Automate flows" -ForegroundColor White
        Write-Host "  - Microsoft Forms" -ForegroundColor White
        Write-Host ""
        Write-Host "The LISTO Medical App will NOT be affected." -ForegroundColor Green
        Write-Host ""
        
        $FinalConfirm = Read-Host "Type 'DELETE ALL' to confirm complete removal"
        if ($FinalConfirm -ne "DELETE ALL") {
            Write-Log "❌ Cleanup cancelled by user"
            exit 0
        }
    }
    
    # Execute cleanup steps
    if ($RemoveLists -or $RemoveAll) {
        Remove-SharePointLists
    }
    
    if ($RemoveFiles -or $RemoveAll) {
        Remove-SiteAssets
    }
    
    if ($RemovePages -or $RemoveAll) {
        Remove-SharePointPages
    }
    
    if ($RemoveFlows -or $RemoveAll) {
        Remove-PowerAutomateFlows
    }
    
    Remove-MicrosoftForms
    Clean-LocalFiles
    Show-CleanupSummary
    
} catch {
    Write-Log ""
    Write-Log "💥 CLEANUP FAILED!" "ERROR"
    Write-Log "Error: $($_.Exception.Message)" "ERROR"
    Write-Log "Some components may still exist - check manually" "ERROR"
    Write-Log ""
    exit 1
}

Write-Log "✅ Cleanup script completed successfully!"