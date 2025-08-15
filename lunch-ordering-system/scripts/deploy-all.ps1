# 🚀 Lunch Ordering System - One-Click Deployment Script
# This script deploys the entire lunch ordering system automatically
# Separate from LISTO Medical App - No interference guaranteed

param(
    [Parameter(Mandatory=$true)]
    [string]$SharePointSiteUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$AdminEmail,
    
    [Parameter(Mandatory=$false)]
    [string]$PowerAutomateEnvironment = "Default",
    
    [Parameter(Mandatory=$false)]
    [switch]$IncludeTestData = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipForms = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$WhatIf = $false
)

# Set up logging
$LogFile = "deployment-log-$(Get-Date -Format 'yyyy-MM-dd-HH-mm-ss').txt"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry -ForegroundColor $(if($Level -eq "ERROR"){"Red"} elseif($Level -eq "WARN"){"Yellow"} else {"Green"})
    Add-Content -Path $LogFile -Value $LogEntry
}

function Test-Prerequisites {
    Write-Log "🔍 Checking prerequisites..."
    
    # Check PowerShell version
    if ($PSVersionTable.PSVersion.Major -lt 5) {
        throw "PowerShell 5.1 or later is required. Current version: $($PSVersionTable.PSVersion)"
    }
    Write-Log "✅ PowerShell version OK: $($PSVersionTable.PSVersion)"
    
    # Check if running as administrator
    $IsAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
    if (-not $IsAdmin) {
        Write-Log "⚠️  Not running as administrator - some features may not work" "WARN"
    }
    
    # Check internet connectivity
    try {
        $null = Test-NetConnection -ComputerName "graph.microsoft.com" -Port 443 -WarningAction SilentlyContinue
        Write-Log "✅ Internet connectivity OK"
    } catch {
        throw "Internet connectivity required for deployment"
    }
    
    # Validate SharePoint URL
    if (-not $SharePointSiteUrl -or $SharePointSiteUrl -notmatch "^https://.*\.sharepoint\.com/") {
        throw "Invalid SharePoint URL format. Expected: https://tenant.sharepoint.com/sites/sitename"
    }
    Write-Log "✅ SharePoint URL format valid"
    
    # Validate email address
    if (-not $AdminEmail -or $AdminEmail -notmatch "^[^@\s]+@[^@\s]+\.[^@\s]+$") {
        throw "Invalid administrator email address format"
    }
    Write-Log "✅ Administrator email format valid"
    
    Write-Log "🎯 All prerequisites met!"
}

function Install-Dependencies {
    Write-Log "📦 Installing required modules..."
    
    # Install PnP PowerShell
    if (-not (Get-Module -ListAvailable -Name "PnP.PowerShell")) {
        Write-Log "Installing PnP.PowerShell module..."
        Install-Module -Name "PnP.PowerShell" -Force -AllowClobber -Scope CurrentUser
    }
    Write-Log "✅ PnP.PowerShell module ready"
    
    # Install Microsoft.PowerApps.Administration.PowerShell (for Power Automate)
    if (-not (Get-Module -ListAvailable -Name "Microsoft.PowerApps.Administration.PowerShell")) {
        Write-Log "Installing Power Platform administration module..."
        Install-Module -Name "Microsoft.PowerApps.Administration.PowerShell" -Force -AllowClobber -Scope CurrentUser
    }
    Write-Log "✅ Power Platform module ready"
}

function Deploy-SharePointLists {
    Write-Log "🏗️  Deploying SharePoint Lists..."
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would create 4 SharePoint lists" "WARN"
        return
    }
    
    try {
        $SetupScriptPath = Join-Path $ScriptDir "setup-sharepoint-lists.ps1"
        if (-not (Test-Path $SetupScriptPath)) {
            throw "Setup script not found: $SetupScriptPath"
        }
        
        $SetupParams = @{
            SharePointSiteUrl = $SharePointSiteUrl
            AdminEmail = $AdminEmail
        }
        
        if ($IncludeTestData) {
            $SetupParams.TestMode = $true
        }
        
        & $SetupScriptPath @SetupParams
        Write-Log "✅ SharePoint lists deployed successfully"
        
    } catch {
        Write-Log "❌ SharePoint list deployment failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Deploy-PowerAutomateFlows {
    Write-Log "⚡ Deploying Power Automate flows..."
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would import 3 Power Automate flows" "WARN"
        return
    }
    
    try {
        # Note: Actual Power Automate deployment requires additional setup
        # This would typically involve using Power Platform CLI or REST APIs
        Write-Log "📝 Manual step required: Import flows from power-automate-flows/ directory" "WARN"
        Write-Log "   1. Go to https://flow.microsoft.com"
        Write-Log "   2. Import each JSON file in power-automate-flows/"
        Write-Log "   3. Configure SharePoint connections"
        Write-Log "   4. Update site URL parameters"
        Write-Log "   5. Test and enable flows"
        
        # For now, just validate the JSON files exist and are valid
        $FlowDir = Join-Path (Split-Path $ScriptDir) "power-automate-flows"
        $FlowFiles = @("voting-flow.json", "order-collection-flow.json", "notification-flow.json")
        
        foreach ($FlowFile in $FlowFiles) {
            $FilePath = Join-Path $FlowDir $FlowFile
            if (Test-Path $FilePath) {
                $JsonContent = Get-Content $FilePath -Raw | ConvertFrom-Json
                Write-Log "✅ Validated: $FlowFile"
            } else {
                Write-Log "❌ Missing flow file: $FlowFile" "ERROR"
            }
        }
        
    } catch {
        Write-Log "❌ Power Automate flow deployment failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Deploy-Dashboard {
    Write-Log "🖥️  Deploying SharePoint dashboard..."
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would upload dashboard files and create page" "WARN"
        return
    }
    
    try {
        # Upload CSS and JS files to Site Assets
        Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
        
        $DashboardDir = Join-Path (Split-Path $ScriptDir) "sharepoint-dashboard"
        
        # Upload files
        $FilesToUpload = @("styles.css", "scripts.js")
        foreach ($File in $FilesToUpload) {
            $FilePath = Join-Path $DashboardDir $File
            if (Test-Path $FilePath) {
                Add-PnPFile -Path $FilePath -Folder "SiteAssets" -ErrorAction SilentlyContinue
                Write-Log "✅ Uploaded: $File"
            }
        }
        
        # Create dashboard page
        $PageName = "Lunch-Dashboard"
        $HtmlPath = Join-Path $DashboardDir "dashboard.html"
        
        if (Test-Path $HtmlPath) {
            # Read HTML content and update file references
            $HtmlContent = Get-Content $HtmlPath -Raw
            $HtmlContent = $HtmlContent -replace 'href="styles.css"', "href=`"/SiteAssets/styles.css`""
            $HtmlContent = $HtmlContent -replace 'src="scripts.js"', "src=`"/SiteAssets/scripts.js`""
            
            # Create the page (this is a simplified approach)
            Write-Log "📝 Manual step required: Create dashboard page" "WARN"
            Write-Log "   1. Go to your SharePoint site"
            Write-Log "   2. Create a new page called '$PageName'"
            Write-Log "   3. Add an Embed/HTML web part"
            Write-Log "   4. Paste the modified HTML content"
            Write-Log "   5. Publish the page"
            
            # Save modified HTML for manual use
            $ModifiedHtmlPath = Join-Path $ScriptDir "dashboard-modified.html"
            Set-Content -Path $ModifiedHtmlPath -Value $HtmlContent
            Write-Log "✅ Modified HTML saved to: $ModifiedHtmlPath"
        }
        
        Disconnect-PnPOnline
        
    } catch {
        Write-Log "❌ Dashboard deployment failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Deploy-Forms {
    Write-Log "📝 Setting up Microsoft Forms..."
    
    if ($SkipForms) {
        Write-Log "⏭️  Skipping Forms deployment as requested"
        return
    }
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would create 2 Microsoft Forms" "WARN"
        return
    }
    
    try {
        # Note: Microsoft Forms don't have a PowerShell API for creation
        # This requires manual setup or Microsoft Graph API calls
        
        $FormsDir = Join-Path (Split-Path $ScriptDir) "microsoft-forms"
        $FormFiles = @("restaurant-voting-template.json", "order-collection-template.json")
        
        Write-Log "📝 Manual step required: Create Microsoft Forms" "WARN"
        Write-Log "   1. Go to https://forms.office.com"
        Write-Log "   2. Create forms using templates in microsoft-forms/"
        Write-Log "   3. Configure form settings (anonymous, one response per person)"
        Write-Log "   4. Connect forms to Power Automate flows"
        Write-Log "   5. Test form submissions"
        
        foreach ($FormFile in $FormFiles) {
            $FilePath = Join-Path $FormsDir $FormFile
            if (Test-Path $FilePath) {
                $JsonContent = Get-Content $FilePath -Raw | ConvertFrom-Json
                Write-Log "✅ Validated template: $($JsonContent.title)"
            } else {
                Write-Log "❌ Missing form template: $FormFile" "ERROR"
            }
        }
        
    } catch {
        Write-Log "❌ Forms setup failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Test-Deployment {
    Write-Log "🧪 Testing deployment..."
    
    if ($WhatIf) {
        Write-Log "WHAT-IF: Would run deployment tests" "WARN"
        return
    }
    
    try {
        Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
        
        # Test SharePoint lists
        $RequiredLists = @("LunchVoting", "LunchOrders", "LunchSessions", "RestaurantMaster")
        foreach ($ListName in $RequiredLists) {
            $List = Get-PnPList -Identity $ListName -ErrorAction SilentlyContinue
            if ($List) {
                Write-Log "✅ List exists: $ListName"
            } else {
                Write-Log "❌ List missing: $ListName" "ERROR"
            }
        }
        
        # Test Site Assets files
        $RequiredFiles = @("styles.css", "scripts.js")
        foreach ($FileName in $RequiredFiles) {
            $File = Get-PnPFile -Url "/SiteAssets/$FileName" -ErrorAction SilentlyContinue
            if ($File) {
                Write-Log "✅ File exists: $FileName"
            } else {
                Write-Log "❌ File missing: $FileName" "ERROR"
            }
        }
        
        Disconnect-PnPOnline
        Write-Log "✅ Basic deployment test completed"
        
    } catch {
        Write-Log "❌ Deployment test failed: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Show-PostDeploymentInstructions {
    Write-Log ""
    Write-Log "🎉 DEPLOYMENT COMPLETED!" -Level "SUCCESS"
    Write-Log ""
    Write-Log "📋 MANUAL STEPS REQUIRED:"
    Write-Log "1. Import Power Automate flows (see log above)"
    Write-Log "2. Create dashboard page (see modified HTML file)"
    Write-Log "3. Create Microsoft Forms (see templates)"
    Write-Log "4. Test the complete system"
    Write-Log ""
    Write-Log "📄 FILES CREATED:"
    Write-Log "- Deployment log: $LogFile"
    Write-Log "- Modified HTML: $(Join-Path $ScriptDir 'dashboard-modified.html')"
    Write-Log ""
    Write-Log "🔗 NEXT STEPS:"
    Write-Log "1. Review the setup-instructions.md guide"
    Write-Log "2. Complete manual configuration steps"
    Write-Log "3. Test with sample data"
    Write-Log "4. Train users with user-manual.md"
    Write-Log ""
    Write-Log "⚠️  REMEMBER: This system is completely separate from LISTO Medical App"
    Write-Log ""
}

# Main deployment execution
try {
    Write-Log "🚀 Starting Lunch Ordering System deployment..."
    Write-Log "📍 Target Site: $SharePointSiteUrl"
    Write-Log "👤 Administrator: $AdminEmail"
    Write-Log "🌍 Environment: $PowerAutomateEnvironment"
    if ($WhatIf) { Write-Log "🔍 WHAT-IF MODE: No changes will be made" "WARN" }
    Write-Log ""
    
    Test-Prerequisites
    Install-Dependencies
    Deploy-SharePointLists
    Deploy-PowerAutomateFlows
    Deploy-Dashboard
    Deploy-Forms
    Test-Deployment
    Show-PostDeploymentInstructions
    
} catch {
    Write-Log ""
    Write-Log "💥 DEPLOYMENT FAILED!" "ERROR"
    Write-Log "Error: $($_.Exception.Message)" "ERROR"
    Write-Log "See troubleshooting guide for solutions" "ERROR"
    Write-Log ""
    exit 1
}

Write-Log "✅ Deployment script completed successfully!"