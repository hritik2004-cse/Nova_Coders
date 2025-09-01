# EmailJS Troubleshooting Guide

## Current Issues and Solutions

### Issue: Emails Not Being Sent

Based on the latest EmailJS documentation, here are the most common issues and their solutions:

## ✅ Fixed Issues in Current Implementation

1. **Removed @emailjs/nodejs dependency** - Using REST API instead
2. **Fixed environment variable spacing** - Removed extra space in EMAILJS_SERVICE_ID
3. **Updated to use correct REST API format**
4. **Added proper rate limiting (1 request per second)**
5. **Enhanced error logging and debugging**

## 🔧 Testing Your EmailJS Setup

### Step 1: Test Configuration
Visit: `http://localhost:3000/api/test-email`

This will show you:
- ✅/❌ Configuration status for each required field
- Detailed error messages if any
- Test email result

### Step 2: Test with Your Email
Visit: `http://localhost:3000/api/test-email?email=your-email@gmail.com`

Replace `your-email@gmail.com` with your actual email address.

### Step 3: Check Your EmailJS Dashboard

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Check your **Email Services** - make sure Gmail/Outlook is connected
3. Check your **Email Templates** - make sure template_m185am7 exists
4. Check **Account** - verify your usage limits

## 🚨 Common Issues and Solutions

### Issue 1: "400 - The user_id parameter is required"
**Solution:** Check your EMAILJS_PUBLIC_KEY in .env file

### Issue 2: "400 - Invalid service_id"
**Solution:** 
- Verify EMAILJS_SERVICE_ID in .env matches your dashboard
- Make sure there are no extra spaces

### Issue 3: "400 - Invalid template_id"
**Solution:**
- Check that template_m185am7 exists in your EmailJS dashboard
- Make sure the template is published (not in draft)

### Issue 4: "403 - Forbidden"
**Solutions:**
- Check your EmailJS account limits (free accounts have monthly limits)
- Verify your email service is properly connected
- Make sure your domain is allowed (if using domain restrictions)

### Issue 5: Template Variables Don't Match
**Current template variables being sent:**
```javascript
{
    to_email: "recipient@example.com",
    to_name: "FirstName",
    from_name: "Nova Coders",
    from_email: "novacoders.team@gmail.com",
    subject: "🚀 Welcome to Nova Coders Community!",
    message: "Full welcome message text...",
    user_name: "FirstName",
    user_email: "recipient@example.com",
    reply_to: "novacoders.team@gmail.com"
}
```

**Make sure your EmailJS template includes these variables:**
- `{{to_email}}`
- `{{to_name}}`
- `{{from_name}}`
- `{{subject}}`
- `{{message}}`

## 📧 EmailJS Template Setup

### Template Requirements
Your EmailJS template should look like this:

**Subject:** `{{subject}}`

**Body:**
```
Hello {{to_name}},

{{message}}

Best regards,
{{from_name}}
```

### Template Variables to Include:
- `to_email` - Recipient email
- `to_name` - Recipient name
- `from_name` - Sender name
- `subject` - Email subject
- `message` - Email content
- `reply_to` - Reply-to email

## 🔍 Debugging Steps

### 1. Check Console Logs
Look for these messages in your terminal:
```
🔧 EmailJS Configuration:
Service ID: ✅ Set
Template ID: ✅ Set
Public Key: ✅ Set
Private Key: ✅ Set
```

### 2. Test API Response
The `/api/test-email` endpoint will show:
```json
{
  "success": true,
  "emailResult": {
    "success": true,
    "emailId": "email-sent-123456789",
    "message": "Welcome email sent successfully via EmailJS"
  },
  "configuration": {
    "serviceId": "✅ Set",
    "templateId": "✅ Set",
    "publicKey": "✅ Set",
    "privateKey": "✅ Set"
  }
}
```

### 3. Check EmailJS Dashboard
- Go to [EmailJS History](https://dashboard.emailjs.com/admin/history)
- Look for recent email attempts
- Check for error messages

## 🛠️ Manual Testing

### Test EmailJS Directly (Browser Console)
```javascript
// In your browser console on any page
fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        service_id: 'service_5p9pbsg',
        template_id: 'template_m185am7',
        user_id: 'NnUPTIJ7SofUnttcG',
        template_params: {
            to_email: 'your-email@gmail.com',
            to_name: 'Test User',
            from_name: 'Nova Coders',
            subject: 'Test Email',
            message: 'This is a test message'
        }
    })
})
.then(response => response.text())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

## 📋 Current Configuration Status

Based on your .env file:
- ✅ Service ID: service_5p9pbsg
- ✅ Template ID: template_m185am7  
- ✅ Public Key: NnUPTIJ7SofUnttcG
- ✅ Private Key: BVe3EZom77wl7vWdWw4AG

## 🚀 Next Steps

1. **Test the configuration**: Visit `/api/test-email` endpoint
2. **Check EmailJS dashboard**: Verify all services are connected
3. **Test with real email**: Use the test endpoint with your email
4. **Check spam folder**: EmailJS emails sometimes go to spam initially
5. **Try newsletter subscription**: Use the actual newsletter form

## 🆘 If Still Not Working

1. **Check EmailJS service status**: https://status.emailjs.com/
2. **Verify email service connection** in EmailJS dashboard
3. **Check account limits** - free accounts have monthly limits
4. **Try creating a new template** with basic variables
5. **Contact EmailJS support** if all else fails

## 📞 Support Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Status Page](https://status.emailjs.com/)
- [EmailJS Support](https://www.emailjs.com/contact-us/)

The implementation has been updated to follow EmailJS best practices and should work correctly with proper configuration!
