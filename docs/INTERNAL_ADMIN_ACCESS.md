# Admin Portal Access Guide (Internal Use Only)

## 🔐 Access Methods for In-House Team

The admin portal is intentionally hidden from public navigation for security. Use these methods to access it:

### Method 1: Direct URL (Recommended)
- **URL**: `https://yourdomain.com/admin/login`
- Bookmark this URL for quick access
- Share only with authorized team members

### Method 2: Keyboard Shortcut
- Press **Ctrl + Shift + A** (Windows/Linux)
- Press **Cmd + Shift + A** (Mac)
- Works from any page on the website
- Opens admin login page directly

### Method 3: Secret Footer Access
- Look for a small dot (•) in the footer next to the copyright text
- **Triple-click** on the copyright text to reveal admin button
- Or hover over the dot to see a small lock icon
- Click to access admin portal

## 📋 Login Credentials

### Admin Access (Full Control)
- **Email**: admin@oilflowbidec.com
- **Password**: [Set in production environment]
- **Permissions**: Full system access, user management, all records

### Sales Team Access
- **Email**: sales@oilflowbidec.com
- **Password**: [Set in production environment]
- **Permissions**: View and manage demo requests, export data

## 🛡️ Security Features

1. **Hidden from Public**: No visible links in main navigation
2. **Session Management**: Auto-logout after inactivity
3. **Role-Based Access**: Different permissions for admin vs sales
4. **Audit Logging**: All actions are logged
5. **IP Restrictions**: Can be configured for office IPs only

## 📊 Dashboard Features

Once logged in, you can:
- View all demo requests with advanced filtering
- Update request status (pending → contacted → scheduled → completed)
- Add follow-up notes
- Export data to CSV
- View email delivery status
- Track conversion metrics
- Search by company, email, or date range

## 🚨 Important Security Notes

1. **Never share login credentials** via email or chat
2. **Always logout** when finished
3. **Use strong passwords** in production
4. **Access only from secure networks**
5. **Report any suspicious activity** immediately

## 🔧 Troubleshooting

### Can't access admin panel?
1. Clear browser cache and cookies
2. Try incognito/private browsing mode
3. Ensure you're using the correct URL
4. Check if you're logged in with correct role

### Keyboard shortcut not working?
- Some browser extensions may interfere
- Try the direct URL method instead
- Ensure no other app is using Ctrl+Shift+A

### Database connection issues?
- The system requires PostgreSQL on port 5439
- Contact DevOps if you see database errors
- Check if VPN is required for database access

## 📞 Support

For technical issues or access problems:
- Contact: [Internal IT Support]
- Slack: #tech-support channel
- Emergency: [On-call developer]

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Classification**: Internal Use Only - Do Not Share Externally