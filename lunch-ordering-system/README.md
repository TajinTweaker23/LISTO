# 🍽️ Lunch Ordering System Automation

**⚠️ SEPARATE FROM LISTO MEDICAL APP - NO INTERFERENCE GUARANTEED**

This lunch ordering system is completely isolated from the LISTO medical hub application and can be deployed independently to SharePoint without affecting any existing LISTO functionality.

## 📋 System Overview

Automated lunch ordering system using SharePoint and Power Automate with:
- **Restaurant voting system**
- **Order collection automation**  
- **Summary notifications**
- **No-account-required access for participants**
- **Minimal manual intervention**

## 🚀 Quick Setup Guide (Dummy-Proof)

### Prerequisites
- SharePoint site with owner permissions
- Power Automate access
- PowerShell execution permissions

### Setup Steps
1. Run the PowerShell setup script: `.\setup-sharepoint-lists.ps1`
2. Import Power Automate flows from the `power-automate-flows/` directory
3. Deploy the HTML dashboard to your SharePoint page
4. Configure Microsoft Forms templates
5. Test the system with the provided test data

## 📁 Directory Structure

```
lunch-ordering-system/
├── README.md                          # This file
├── setup/
│   ├── setup-sharepoint-lists.ps1    # PowerShell script for SharePoint lists
│   ├── configuration.json             # System configuration
│   └── test-data.json                # Sample data for testing
├── power-automate-flows/
│   ├── voting-flow.json              # Restaurant voting automation
│   ├── order-collection-flow.json    # Order collection automation
│   └── notification-flow.json        # Summary notification automation
├── sharepoint-dashboard/
│   ├── dashboard.html                # Main dashboard HTML
│   ├── styles.css                    # Dashboard styling
│   └── scripts.js                    # Dashboard functionality
├── microsoft-forms/
│   ├── restaurant-voting-template.json
│   └── order-collection-template.json
├── documentation/
│   ├── setup-instructions.md
│   ├── troubleshooting-guide.md
│   └── user-manual.md
└── scripts/
    ├── deploy-all.ps1               # One-click deployment script
    └── cleanup.ps1                 # System cleanup script
```

## 🔧 Features

### ✅ Restaurant Voting System
- Anonymous voting capability
- Real-time vote tracking  
- Automatic winner selection
- Configurable voting periods

### ✅ Order Collection
- Streamlined order entry
- Menu item validation
- Cost calculation
- Deadline enforcement

### ✅ Automation Features
- Scheduled voting reminders
- Order collection notifications
- Summary email generation
- Cleanup of old data

### ✅ User Experience
- No login required for basic participation
- Mobile-friendly interface
- Simple, intuitive design
- Accessibility compliance

## 🛡️ Isolation from LISTO App

This system is completely separate from the LISTO medical application:
- **Separate directory structure** - no shared files
- **Independent configuration** - no shared settings
- **Isolated dependencies** - no interference with LISTO dependencies
- **Separate deployment** - can be deployed independently
- **No code overlap** - completely different codebase

## 📞 Support

See `documentation/troubleshooting-guide.md` for common issues and solutions.