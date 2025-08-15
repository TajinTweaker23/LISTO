# 🚀 Lunch Ordering System - Setup Instructions

**IMPORTANT**: This system is completely separate from the LISTO Medical Hub application and will not interfere with any existing functionality.

## 📋 Prerequisites

Before starting the setup, ensure you have:

- [ ] SharePoint site with **Owner** permissions
- [ ] Power Automate access (included with most M365 plans)
- [ ] PowerShell 5.1 or later installed on your computer
- [ ] Administrative privileges on your computer for PowerShell script execution

## 🎯 Quick Setup (15 minutes)

### Step 1: SharePoint Lists Setup (5 minutes)

1. **Download** the setup files to your computer
2. **Open PowerShell as Administrator**
3. **Navigate** to the `lunch-ordering-system/setup/` directory
4. **Run the setup script**:
   ```powershell
   .\setup-sharepoint-lists.ps1 -SharePointSiteUrl "https://your-tenant.sharepoint.com/sites/your-site" -AdminEmail "your.email@company.com" -TestMode
   ```
5. **Authenticate** when prompted with your SharePoint credentials
6. **Verify** the script completes successfully

**Expected Output**:
- ✅ 4 SharePoint lists created
- ✅ Test data added (if -TestMode used)
- ✅ Configuration completed

### Step 2: Power Automate Flows (5 minutes)

1. **Go to** [Power Automate portal](https://flow.microsoft.com)
2. **Click** "My flows" → "Import"
3. **Import each flow** from `power-automate-flows/` directory:
   - `voting-flow.json` (Restaurant voting automation)
   - `order-collection-flow.json` (Order processing)
   - `notification-flow.json` (Notifications and summaries)
4. **Configure connections** for each flow:
   - SharePoint connection: Point to your site
   - Office 365 Outlook connection: Use your credentials
5. **Update SharePoint site URL** in each flow's parameters
6. **Save and turn on** all flows

### Step 3: Dashboard Deployment (3 minutes)

1. **Go to** your SharePoint site
2. **Create a new page** called "Lunch Dashboard"
3. **Add a Text web part**
4. **Click** "Edit web part" → "Source code"
5. **Copy and paste** the contents of `sharepoint-dashboard/dashboard.html`
6. **Upload** `styles.css` and `scripts.js` to your Site Assets library
7. **Update** the file references in the HTML to point to your Site Assets
8. **Save and publish** the page

### Step 4: Forms Setup (2 minutes)

1. **Go to** [Microsoft Forms](https://forms.office.com)
2. **Create new forms** using the templates:
   - Import `restaurant-voting-template.json` for voting
   - Import `order-collection-template.json` for orders
3. **Update** form settings to match your requirements
4. **Connect forms** to SharePoint lists (Power Automate will handle this)

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] **SharePoint Lists**: All 4 lists exist with correct columns
- [ ] **Power Automate**: All 3 flows are running without errors  
- [ ] **Dashboard**: Page loads and shows mock data
- [ ] **Forms**: Both forms can be accessed and submitted
- [ ] **Test Data**: Sample restaurants and session visible

## 🔧 Configuration

### Customizing Restaurant List

1. **Go to** SharePoint site → "Restaurant Master List"
2. **Add new items** with your preferred restaurants:
   - Restaurant Name
   - Cuisine type
   - Menu URL
   - Phone number
   - Delivery details
3. **Update** forms to reflect new restaurant choices

### Setting Up Automated Sessions

1. **Edit** the notification flow in Power Automate
2. **Adjust** the schedule trigger to match your needs:
   - Daily at 9 AM (default)
   - Different time zones
   - Different days of week
3. **Save** the flow

### Email Notifications

1. **Update** coordinator email in flows
2. **Customize** email templates in Power Automate
3. **Test** notifications with sample data

## 🎨 Customization Options

### Dashboard Branding

Edit `sharepoint-dashboard/styles.css`:
- Change color scheme (primary: `--primary-color`)
- Update fonts and styling
- Add company logo

### Form Appearance

In Microsoft Forms:
- Apply company theme
- Add logo
- Customize confirmation messages
- Set up custom domains (if available)

## 🔒 Permissions Setup

### SharePoint Lists
- **Contributors**: Can add/edit their own orders and votes
- **Visitors**: Can view dashboard (read-only)
- **Owners**: Full admin access

### Power Automate Flows  
- **Run-only permissions** for regular users
- **Edit permissions** for lunch coordinators only

## 📱 Mobile Optimization

The dashboard is mobile-friendly by default:
- Responsive design works on all devices
- Touch-friendly buttons and forms
- Fast loading on mobile connections

## 🔄 Daily Workflow

Once set up, the daily process is:

1. **Morning (9 AM)**: System automatically starts voting
2. **Mid-morning**: Voting closes, winner selected automatically  
3. **Late morning**: Order collection opens automatically
4. **Lunch time**: Order collection closes, summary sent to coordinator
5. **Afternoon**: System tracks delivery status

## 🆘 Troubleshooting

If you encounter issues during setup:

1. **Check** `documentation/troubleshooting-guide.md`
2. **Verify** SharePoint permissions
3. **Confirm** Power Automate connections
4. **Test** with sample data first
5. **Contact** your IT administrator if needed

## 📞 Support

For additional help:
- Review troubleshooting guide
- Check Power Automate run history for errors
- Test individual components separately
- Document any customizations for future reference

---

**Next Steps**: Once setup is complete, see `user-manual.md` for daily operation instructions.