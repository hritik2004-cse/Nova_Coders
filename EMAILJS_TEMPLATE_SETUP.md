# EmailJS Template Setup Guide

## The Error "The recipients address is empty"

This error means your EmailJS template is not configured correctly to receive the email address. Here's how to fix it:

## 📧 EmailJS Template Configuration

### Step 1: Go to Your EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/
2. Login to your account
3. Go to **"Email Templates"**
4. Find template ID: `template_m185am7`
5. Click **"Edit"** to modify the template

### Step 2: Configure Template Settings

#### **To Section (Most Important!):**
In the "To" field, you MUST use one of these variables:
```
{{user_email}}
```
OR
```
{{to_email}}
```

#### **From Section:**
```
{{from_name}} <{{from_email}}>
```
OR simply:
```
Nova Coders <novacoders.team@gmail.com>
```

#### **Reply-To Section:**
```
{{reply_to}}
```
OR simply:
```
novacoders.team@gmail.com
```

#### **Subject Section:**
```
{{subject}}
```

### Step 3: Template Body

Your template body should look like this:

```html
Hello {{user_name}},

{{message}}

Best regards,
{{from_name}}
```

OR for a more detailed template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{subject}}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">{{subject}}</h2>
        
        <p>Hello {{user_name}},</p>
        
        <div style="white-space: pre-line;">{{message}}</div>
        
        <hr style="margin: 30px 0;">
        
        <p>Best regards,<br>
        {{from_name}}</p>
        
        <p style="font-size: 12px; color: #666;">
            This email was sent to {{user_email}}
        </p>
    </div>
</body>
</html>
```

### Step 4: Template Variables Summary

Make sure your template includes these variables:

| Variable | Purpose | Required |
|----------|---------|----------|
| `{{user_email}}` or `{{to_email}}` | Recipient email | **YES** (for To field) |
| `{{user_name}}` or `{{to_name}}` | Recipient name | No |
| `{{from_name}}` | Sender name | No |
| `{{from_email}}` | Sender email | No |
| `{{reply_to}}` | Reply-to email | No |
| `{{subject}}` | Email subject | No |
| `{{message}}` | Email content | No |

### Step 5: Test Settings Tab

In the "Test" tab of your template:
1. Add test values:
   ```
   user_email: your-test-email@gmail.com
   user_name: Test User
   from_name: Nova Coders
   subject: Test Subject
   message: Test message content
   ```
2. Click "Send Test" to verify it works

### Step 6: Save and Publish

1. Click **"Save"** to save your changes
2. Make sure the template is **"Published"** (not in draft mode)
3. The status should show as "Active"

## 🔧 Quick Fix Template

If you want a quick working template, copy this exact setup:

**To field:**
```
{{user_email}}
```

**From field:**
```
Nova Coders <novacoders.team@gmail.com>
```

**Subject field:**
```
{{subject}}
```

**Body (HTML):**
```html
<p>Hello {{user_name}},</p>

<div style="white-space: pre-line;">{{message}}</div>

<p>Best regards,<br>Nova Coders Team</p>
```

## 🧪 After Setting Up Template

1. **Save and publish** your template
2. Go to: `http://localhost:3000/emailjs-test`
3. Test with your email address
4. Check your inbox (and spam folder)

## 🚨 Common Issues

1. **"Recipients address is empty"** = Missing `{{user_email}}` in To field
2. **"Invalid template"** = Template is in draft mode or deleted
3. **"Forbidden"** = Account limits exceeded or service disconnected
4. **No email received** = Check spam folder or template variables

## ✅ Success Indicators

When working correctly, you should see:
- ✅ "Email sent successfully" in the test page
- ✅ Console log: "EmailJS Success: {status: 200, text: 'OK'}"
- ✅ Email appears in your inbox within 1-2 minutes

The key is making sure the **To field** in your EmailJS template contains `{{user_email}}` or `{{to_email}}`!
