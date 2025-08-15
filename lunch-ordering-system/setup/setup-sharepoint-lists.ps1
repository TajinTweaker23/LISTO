# 🍽️ Lunch Ordering System - SharePoint Setup Script
# This script creates all necessary SharePoint lists for the lunch ordering system
# Run with Administrator privileges

param(
    [Parameter(Mandatory=$true)]
    [string]$SharePointSiteUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$AdminEmail = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$TestMode = $false
)

# Import required modules
try {
    Import-Module PnP.PowerShell -Force -ErrorAction Stop
    Write-Host "✅ PnP.PowerShell module loaded successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ PnP.PowerShell module not found. Installing..." -ForegroundColor Yellow
    Install-Module -Name PnP.PowerShell -Force -AllowClobber
    Import-Module PnP.PowerShell -Force
    Write-Host "✅ PnP.PowerShell module installed and loaded" -ForegroundColor Green
}

# Configuration
$ListConfigurations = @(
    @{
        Name = "LunchVoting"
        Title = "Restaurant Voting"
        Description = "Track votes for restaurant selection"
        Template = "GenericList"
        Fields = @(
            @{ Name = "RestaurantName"; Type = "Text"; Required = $true; Description = "Name of the restaurant" }
            @{ Name = "VoteCount"; Type = "Number"; Required = $true; Default = 0; Description = "Number of votes received" }
            @{ Name = "MenuUrl"; Type = "URL"; Required = $false; Description = "Link to restaurant menu" }
            @{ Name = "VotingDate"; Type = "DateTime"; Required = $true; Description = "Date of voting session" }
            @{ Name = "IsActive"; Type = "Boolean"; Required = $true; Default = $true; Description = "Whether voting is active" }
            @{ Name = "AverageRating"; Type = "Number"; Required = $false; Description = "Average user rating" }
        )
    },
    @{
        Name = "LunchOrders"
        Title = "Lunch Orders"
        Description = "Collect individual lunch orders"
        Template = "GenericList"
        Fields = @(
            @{ Name = "UserName"; Type = "Text"; Required = $true; Description = "Name of person placing order" }
            @{ Name = "UserEmail"; Type = "Text"; Required = $false; Description = "Email address for notifications" }
            @{ Name = "RestaurantName"; Type = "Text"; Required = $true; Description = "Selected restaurant" }
            @{ Name = "MenuItems"; Type = "Note"; Required = $true; Description = "Ordered items with details" }
            @{ Name = "TotalCost"; Type = "Currency"; Required = $false; Description = "Estimated total cost" }
            @{ Name = "SpecialInstructions"; Type = "Note"; Required = $false; Description = "Special dietary requests or instructions" }
            @{ Name = "OrderDate"; Type = "DateTime"; Required = $true; Description = "Date order was placed" }
            @{ Name = "OrderStatus"; Type = "Choice"; Required = $true; 
              Choices = @("Pending", "Confirmed", "Ordered", "Delivered", "Cancelled"); 
              Default = "Pending"; Description = "Current status of the order" }
        )
    },
    @{
        Name = "LunchSessions"
        Title = "Lunch Sessions"
        Description = "Manage lunch ordering sessions and deadlines"
        Template = "GenericList"
        Fields = @(
            @{ Name = "SessionDate"; Type = "DateTime"; Required = $true; Description = "Date of lunch session" }
            @{ Name = "VotingDeadline"; Type = "DateTime"; Required = $true; Description = "When voting closes" }
            @{ Name = "OrderDeadline"; Type = "DateTime"; Required = $true; Description = "When ordering closes" }
            @{ Name = "SelectedRestaurant"; Type = "Text"; Required = $false; Description = "Restaurant chosen for this session" }
            @{ Name = "TotalParticipants"; Type = "Number"; Required = $false; Default = 0; Description = "Number of participants" }
            @{ Name = "TotalOrders"; Type = "Number"; Required = $false; Default = 0; Description = "Number of orders placed" }
            @{ Name = "SessionStatus"; Type = "Choice"; Required = $true; 
              Choices = @("Planning", "Voting", "OrderCollection", "Ordered", "Completed", "Cancelled"); 
              Default = "Planning"; Description = "Current session status" }
            @{ Name = "Coordinator"; Type = "Text"; Required = $false; Description = "Person coordinating this session" }
        )
    },
    @{
        Name = "RestaurantMaster"
        Title = "Restaurant Master List"
        Description = "Master list of available restaurants and their details"
        Template = "GenericList"
        Fields = @(
            @{ Name = "RestaurantName"; Type = "Text"; Required = $true; Description = "Restaurant name" }
            @{ Name = "Cuisine"; Type = "Choice"; Required = $true; 
              Choices = @("Italian", "Mexican", "Chinese", "Indian", "American", "Thai", "Japanese", "Mediterranean", "Other"); 
              Description = "Type of cuisine" }
            @{ Name = "MenuUrl"; Type = "URL"; Required = $false; Description = "Link to online menu" }
            @{ Name = "PhoneNumber"; Type = "Text"; Required = $false; Description = "Restaurant phone number" }
            @{ Name = "DeliveryFee"; Type = "Currency"; Required = $false; Description = "Delivery fee if applicable" }
            @{ Name = "MinimumOrder"; Type = "Currency"; Required = $false; Description = "Minimum order amount" }
            @{ Name = "AverageDeliveryTime"; Type = "Text"; Required = $false; Description = "Typical delivery time" }
            @{ Name = "IsActive"; Type = "Boolean"; Required = $true; Default = $true; Description = "Whether restaurant is available" }
            @{ Name = "Notes"; Type = "Note"; Required = $false; Description = "Additional notes about the restaurant" }
        )
    }
)

# Function to create SharePoint list
function New-LunchOrderingList {
    param(
        [hashtable]$ListConfig
    )
    
    try {
        Write-Host "Creating list: $($ListConfig.Title)..." -ForegroundColor Yellow
        
        # Check if list already exists
        $existingList = Get-PnPList -Identity $ListConfig.Name -ErrorAction SilentlyContinue
        if ($existingList) {
            Write-Host "⚠️  List '$($ListConfig.Title)' already exists. Skipping creation." -ForegroundColor Yellow
            return
        }
        
        # Create the list
        $list = New-PnPList -Title $ListConfig.Title -Template $ListConfig.Template -Url $ListConfig.Name
        Set-PnPList -Identity $ListConfig.Name -Description $ListConfig.Description
        
        # Add custom fields
        foreach ($field in $ListConfig.Fields) {
            try {
                switch ($field.Type) {
                    "Text" {
                        Add-PnPField -List $ListConfig.Name -DisplayName $field.Name -InternalName $field.Name -Type Text -Required:$field.Required
                    }
                    "Number" {
                        $fieldXml = "<Field Type='Number' DisplayName='$($field.Name)' Name='$($field.Name)' Required='$($field.Required.ToString().ToUpper())'/>"
                        Add-PnPFieldFromXml -List $ListConfig.Name -FieldXml $fieldXml
                    }
                    "Currency" {
                        $fieldXml = "<Field Type='Currency' DisplayName='$($field.Name)' Name='$($field.Name)' Required='$($field.Required.ToString().ToUpper())'/>"
                        Add-PnPFieldFromXml -List $ListConfig.Name -FieldXml $fieldXml
                    }
                    "DateTime" {
                        Add-PnPField -List $ListConfig.Name -DisplayName $field.Name -InternalName $field.Name -Type DateTime -Required:$field.Required
                    }
                    "Boolean" {
                        $fieldXml = "<Field Type='Boolean' DisplayName='$($field.Name)' Name='$($field.Name)' Required='$($field.Required.ToString().ToUpper())'/>"
                        Add-PnPFieldFromXml -List $ListConfig.Name -FieldXml $fieldXml
                    }
                    "Note" {
                        Add-PnPField -List $ListConfig.Name -DisplayName $field.Name -InternalName $field.Name -Type Note -Required:$field.Required
                    }
                    "URL" {
                        Add-PnPField -List $ListConfig.Name -DisplayName $field.Name -InternalName $field.Name -Type URL -Required:$field.Required
                    }
                    "Choice" {
                        $choicesXml = $field.Choices | ForEach-Object { "<CHOICE>$_</CHOICE>" }
                        $fieldXml = "<Field Type='Choice' DisplayName='$($field.Name)' Name='$($field.Name)' Required='$($field.Required.ToString().ToUpper())'><CHOICES>$($choicesXml -join '')</CHOICES></Field>"
                        Add-PnPFieldFromXml -List $ListConfig.Name -FieldXml $fieldXml
                    }
                }
            } catch {
                Write-Host "⚠️  Warning: Could not create field '$($field.Name)' - $($_.Exception.Message)" -ForegroundColor Yellow
            }
        }
        
        Write-Host "✅ Successfully created list: $($ListConfig.Title)" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Error creating list '$($ListConfig.Title)': $($_.Exception.Message)" -ForegroundColor Red
        throw
    }
}

# Function to add sample data for testing
function Add-TestData {
    Write-Host "Adding test data..." -ForegroundColor Yellow
    
    try {
        # Add sample restaurants
        $restaurants = @(
            @{ RestaurantName = "Mario's Pizza Palace"; Cuisine = "Italian"; MenuUrl = "https://mariospizza.com/menu"; PhoneNumber = "555-0123"; IsActive = $true }
            @{ RestaurantName = "Taco Fiesta"; Cuisine = "Mexican"; MenuUrl = "https://tacofiesta.com/menu"; PhoneNumber = "555-0124"; IsActive = $true }
            @{ RestaurantName = "Dragon Garden"; Cuisine = "Chinese"; MenuUrl = "https://dragongarden.com/menu"; PhoneNumber = "555-0125"; IsActive = $true }
        )
        
        foreach ($restaurant in $restaurants) {
            Add-PnPListItem -List "RestaurantMaster" -Values $restaurant
        }
        
        # Add a sample session
        $sessionData = @{
            SessionDate = (Get-Date).AddDays(1).ToString("yyyy-MM-ddTHH:mm:ssZ")
            VotingDeadline = (Get-Date).AddHours(2).ToString("yyyy-MM-ddTHH:mm:ssZ")
            OrderDeadline = (Get-Date).AddHours(6).ToString("yyyy-MM-ddTHH:mm:ssZ")
            SessionStatus = "Voting"
            Coordinator = $AdminEmail
        }
        Add-PnPListItem -List "LunchSessions" -Values $sessionData
        
        Write-Host "✅ Test data added successfully" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Warning: Could not add test data - $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Main execution
try {
    Write-Host "🍽️ Starting Lunch Ordering System SharePoint Setup" -ForegroundColor Cyan
    Write-Host "Target Site: $SharePointSiteUrl" -ForegroundColor Cyan
    
    # Connect to SharePoint
    Write-Host "Connecting to SharePoint site..." -ForegroundColor Yellow
    Connect-PnPOnline -Url $SharePointSiteUrl -Interactive
    Write-Host "✅ Connected to SharePoint successfully" -ForegroundColor Green
    
    # Create all lists
    foreach ($listConfig in $ListConfigurations) {
        New-LunchOrderingList -ListConfig $listConfig
    }
    
    # Add test data if requested
    if ($TestMode) {
        Add-TestData
    }
    
    Write-Host ""
    Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
    Write-Host "Created the following lists:" -ForegroundColor Green
    foreach ($listConfig in $ListConfigurations) {
        Write-Host "  - $($listConfig.Title)" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Import Power Automate flows from the power-automate-flows directory" -ForegroundColor White
    Write-Host "2. Deploy the HTML dashboard to your SharePoint page" -ForegroundColor White
    Write-Host "3. Configure Microsoft Forms templates" -ForegroundColor White
    Write-Host "4. Test the system with sample data" -ForegroundColor White
    
} catch {
    Write-Host ""
    Write-Host "❌ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the error details above and try again." -ForegroundColor Red
    exit 1
}

# Cleanup
Disconnect-PnPOnline