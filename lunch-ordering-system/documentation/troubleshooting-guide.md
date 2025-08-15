# 🛠️ Troubleshooting Guide - Lunch Ordering System

This guide covers common issues and solutions for the lunch ordering system. All issues are isolated from the LISTO Medical App.

## 🚨 Common Setup Issues

### Issue: PowerShell Script Fails to Run

**Symptoms**:
- "Execution policy" error when running setup script
- Script appears to start but stops immediately

**Solutions**:
1. **Enable PowerShell script execution**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Run PowerShell as Administrator**:
   - Right-click PowerShell icon → "Run as administrator"

3. **Check PowerShell version**:
   ```powershell
   $PSVersionTable.PSVersion
   ```
   - Requires PowerShell 5.1 or later

4. **Install PnP PowerShell manually** if auto-install fails:
   ```powershell
   Install-Module -Name PnP.PowerShell -Force -AllowClobber
   ```

### Issue: SharePoint Connection Fails

**Symptoms**:
- Authentication popup doesn't appear
- "Access denied" errors
- Connection timeout

**Solutions**:
1. **Verify SharePoint URL**:
   - Must be exact site URL
   - Check for typos or extra characters
   - Confirm site exists and is accessible

2. **Check permissions**:
   - User must be Site Owner or have Full Control
   - Test by manually accessing SharePoint site

3. **Clear authentication cache**:
   ```powershell
   Disconnect-PnPOnline
   Connect-PnPOnline -Url "your-site-url" -Interactive
   ```

4. **Try different authentication method**:
   ```powershell
   Connect-PnPOnline -Url "your-site-url" -UseWebLogin
   ```

### Issue: SharePoint Lists Not Created

**Symptoms**:
- Script completes but lists don't appear
- Partial list creation
- Missing columns in lists

**Solutions**:
1. **Check list creation logs** in PowerShell output
2. **Manually verify** site permissions
3. **Re-run script** with verbose output:
   ```powershell
   .\setup-sharepoint-lists.ps1 -SharePointSiteUrl "your-url" -Verbose
   ```
4. **Create lists manually** if script fails:
   - Use the field definitions in the script as a guide
   - Follow SharePoint standard list creation process

## ⚡ Power Automate Issues

### Issue: Flows Don't Import

**Symptoms**:
- JSON import errors
- Missing connections
- Flow appears corrupted

**Solutions**:
1. **Verify JSON format**:
   - Check for trailing commas or syntax errors
   - Use JSON validator online tool

2. **Import one flow at a time**:
   - Start with the simplest flow (voting-flow.json)
   - Test each flow individually

3. **Create connections first**:
   - Go to Data → Connections
   - Create SharePoint and Office 365 connections manually
   - Then import flows

4. **Update connection references**:
   - After import, edit each flow
   - Update connection references to use your connections

### Issue: Flows Run But Don't Work

**Symptoms**:
- Flows show "Succeeded" but no results
- Data not appearing in SharePoint lists
- Emails not being sent

**Solutions**:
1. **Check flow run history**:
   - Look for failed steps or warnings
   - Review input/output data for each step

2. **Verify SharePoint list names**:
   - Ensure list names match exactly in flows
   - Check for spelling differences

3. **Test with sample data**:
   - Use Power Automate "Test" feature
   - Provide known good sample data

4. **Update SharePoint site URL** in flow parameters:
   - Each flow has a parameter for the site URL
   - Must match your exact SharePoint site

### Issue: Email Notifications Not Sent

**Symptoms**:
- Flows succeed but no emails received
- "Send email" step fails in Power Automate

**Solutions**:
1. **Check email addresses**:
   - Verify coordinator email is correct
   - Check spam/junk folders

2. **Verify Office 365 connection**:
   - Ensure connection has email sending permissions
   - Re-authenticate if needed

3. **Test email step separately**:
   - Create a simple flow that just sends email
   - Verify basic email functionality works

## 🖥️ Dashboard Issues

### Issue: Dashboard Doesn't Load

**Symptoms**:
- Blank page or error messages
- Styles not loading correctly
- JavaScript errors in browser console

**Solutions**:
1. **Check file references**:
   - Verify CSS and JS files uploaded to Site Assets
   - Update file paths in HTML to match your library structure

2. **Review browser console**:
   - Press F12 → Console tab
   - Look for JavaScript errors or failed resource loads

3. **Test in different browser**:
   - Try Chrome, Edge, and Firefox
   - Check for browser-specific issues

4. **Verify SharePoint permissions**:
   - Site Assets library must be accessible
   - Users need read access to CSS/JS files

### Issue: Dashboard Shows No Data

**Symptoms**:
- Dashboard loads but shows "Loading..." or empty sections
- No restaurants or orders visible

**Solutions**:
1. **Add test data**:
   - Run PowerShell script with `-TestMode` parameter
   - Or manually add sample data to SharePoint lists

2. **Check JavaScript configuration**:
   - Verify `CONFIG.sharePointSiteUrl` is set correctly
   - Update list names in `CONFIG.lists` if needed

3. **Verify API permissions**:
   - Dashboard may need REST API access to SharePoint
   - Check if SharePoint REST endpoints are accessible

## 📱 Forms Issues

### Issue: Forms Don't Submit to SharePoint

**Symptoms**:
- Form submissions succeed but data doesn't appear in lists
- Users see confirmation but data is missing

**Solutions**:
1. **Check Power Automate flow connections**:
   - Verify forms trigger the correct flows
   - Test flow manually with sample data

2. **Verify field mappings**:
   - Ensure form questions map to correct SharePoint columns
   - Check for data type mismatches

3. **Test with simple data**:
   - Submit forms with basic text values
   - Avoid special characters initially

### Issue: Forms Not Accessible

**Symptoms**:
- Users get permission errors accessing forms
- Forms don't load for some users

**Solutions**:
1. **Check form sharing settings**:
   - Ensure forms are shared with appropriate users
   - Consider organization-wide sharing if needed

2. **Verify user accounts**:
   - Users must have valid Office 365/Microsoft 365 accounts
   - Guest users may need special permissions

## 🔄 Data Sync Issues

### Issue: Data Not Updating in Real-Time

**Symptoms**:
- Dashboard shows stale data
- Vote counts or order totals incorrect
- Delays between submission and display

**Solutions**:
1. **Check refresh intervals**:
   - Dashboard refreshes every 30 seconds by default
   - Force refresh using refresh button

2. **Verify Power Automate triggers**:
   - Flows should trigger immediately on list changes
   - Check trigger configuration in flows

3. **Clear browser cache**:
   - Hard refresh page (Ctrl+F5)
   - Clear browser cache and cookies

## 🔐 Permission Issues

### Issue: Users Can't Access System

**Symptoms**:
- "Access denied" errors
- Users can see dashboard but can't vote/order
- Some features work but others don't

**Solutions**:
1. **Review SharePoint permissions**:
   ```
   Restaurant Master List: Read for all users
   Lunch Voting: Contribute for all users  
   Lunch Orders: Contribute for all users
   Lunch Sessions: Read for users, Full Control for coordinators
   ```

2. **Check Power Automate permissions**:
   - Flows should have "Run-only" permissions for users
   - Edit permissions only for coordinators

3. **Verify site access**:
   - Users need at least "Visit" permissions on SharePoint site
   - Consider adding users to site members group

## 🆘 Emergency Recovery

### Complete System Reset

If everything is broken and you need to start over:

1. **Delete all SharePoint lists**:
   - Go to Site Contents → Delete each lunch-related list

2. **Delete all Power Automate flows**:
   - Go to My Flows → Delete imported flows

3. **Remove dashboard page**:
   - Delete the SharePoint page

4. **Start fresh**:
   - Re-run setup script
   - Re-import flows
   - Recreate dashboard page

### Data Recovery

If data is lost or corrupted:

1. **Check SharePoint recycle bin**:
   - Site contents → Recycle bin
   - Restore deleted items if found

2. **Review Power Automate run history**:
   - May contain historical data in run logs
   - Export data from successful runs

3. **Recreate from backups**:
   - If you have data exports, re-import manually

## 📞 Getting Help

If these solutions don't resolve your issue:

1. **Document the problem**:
   - Screenshot error messages
   - Note exact steps that lead to the issue
   - Record browser console errors

2. **Check system requirements**:
   - Verify all prerequisites are met
   - Confirm software versions

3. **Contact IT support**:
   - Provide detailed problem description
   - Include screenshots and error messages
   - Reference this troubleshooting guide

4. **Test in isolation**:
   - Try components separately (SharePoint, Power Automate, Dashboard)
   - Identify which specific component is failing

---

**Remember**: This system is completely separate from LISTO Medical App, so issues here won't affect that application and vice versa.